/**
 * Search Page Logic
 * Handles live search, filtering, sorting, and item display with modal integration
 */

// State management
let allItems = [];
let filteredItems = [];
let currentSort = 'date';
let currentStatusFilter = 'all';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const itemsGrid = document.getElementById('itemsGrid');
const resultsCount = document.getElementById('resultsCount');
const noResults = document.getElementById('noResults');
const sortButtons = document.querySelectorAll('[data-sort]');