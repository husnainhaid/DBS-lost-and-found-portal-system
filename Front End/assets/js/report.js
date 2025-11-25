
// DOM Elements
const reportForm = document.getElementById('reportForm');
const imageInput = document.getElementById('itemImage');
const imagePreview = document.getElementById('imagePreview');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');


imageInput.addEventListener('change', function (e) {
    const file = e.target.files[0];

    if (file) {
       
        if (!file.type.startsWith('image/')) {
            showToast('Please select a valid image file', 'error');
            imageInput.value = '';
            return;
        }

        
        if (file.size > 5 * 1024 * 1024) {
            showToast('Image size should be less than 5MB', 'error');
            imageInput.value = '';
            return;
        }

     
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
        
        imagePreviewContainer.classList.add('hidden');
        imagePreview.src = '';
    }
});

