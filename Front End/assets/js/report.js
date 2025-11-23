/**
 * Report Page Logic
 * Handles image preview and form submission for reporting lost items
 */

// DOM Elements
const reportForm = document.getElementById('reportForm');
const imageInput = document.getElementById('itemImage');
const imagePreview = document.getElementById('imagePreview');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');

/**
 * Handle image selection and preview
 */
imageInput.addEventListener('change', function (e) {
    const file = e.target.files[0];

    if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            showToast('Please select a valid image file', 'error');
            imageInput.value = '';
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showToast('Image size should be less than 5MB', 'error');
            imageInput.value = '';
            return;
        }

        // Create preview
        const reader = new FileReader();

        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreviewContainer.classList.remove('hidden');
        };

        reader.onerror = function () {
            showToast('Error reading image file', 'error');
        };

        reader.readAsDataURL(file);
    } else {
        // Hide preview if no file selected
        imagePreviewContainer.classList.add('hidden');
        imagePreview.src = '';
    }
});

