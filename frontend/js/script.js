// Array to store uploaded files
let uploadedFiles = [];

// DOM elements
const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('file');
const fileList = document.getElementById('fileList');

// Load any previously saved files from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedFiles = localStorage.getItem('uploadedFiles');
    if (savedFiles) {
        uploadedFiles = JSON.parse(savedFiles);
        renderFileList();
    }
});

// Handle form submission
uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const file = fileInput.files[0];
    if (!file) return;
    
    // Add file to our array (in a real app, you would upload to a server here)
    const fileObject = {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        url: URL.createObjectURL(file) // Create a local URL for the file
    };
    
    uploadedFiles.push(fileObject);
    
    // Save to localStorage
    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
    
    // Render the updated file list
    renderFileList();
    
    // Reset the form
    uploadForm.reset();
});

// Render the file list
function renderFileList() {
    fileList.innerHTML = '';
    
    uploadedFiles.forEach((file, index) => {
        const li = document.createElement('li');
        
        const link = document.createElement('a');
        link.href = file.url;
        link.textContent = file.name;
        link.target = '_blank';
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteFile(index);
        });
        
        li.appendChild(link);
        li.appendChild(deleteButton);
        fileList.appendChild(li);
    });
}

// Delete a file
function deleteFile(index) {
    // Revoke the URL to free memory
    URL.revokeObjectURL(uploadedFiles[index].url);
    
    // Remove from array
    uploadedFiles.splice(index, 1);
    
    // Update localStorage
    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
    
    // Re-render the file list
    renderFileList();
}