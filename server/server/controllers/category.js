const Category = require('../models/category');

//create a category
const createCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const category = new Category({ name }); 
        await category.save();

        res.status(201).json({ message: 'Category successfully created', category });
    } catch (error) {
        res.status(500).json({ message: 'Server error, unable to create category' });
    }
};

//update a category
const updateCategoryById = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });  
        }

        category.name = name || category.name;
        await category.save();

        res.status(200).json({ message: 'Category successfully updated', category });
    } catch (error) {
        res.status(500).json({ message: 'Server error, unable to update category' });  
    }
};

//get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ message: 'Server error, unable to get categories' });
    }
};

// get a single category by id
const getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ category });
    } catch (error) {
        res.status(500).json({ message: 'Server error, unable to get category' });
    }
};

//delete a category by Id
const deleteCategoryById = async (req, res) => {
    const { id } = req.params;  

    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error, unable to delete category' });
    }
};

module.exports = {
    createCategory,
    updateCategoryById,
    getCategories,
    getCategoryById, 
    deleteCategoryById
};

