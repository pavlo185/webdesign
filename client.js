document.addEventListener("DOMContentLoaded", function() {
    const blogForm = document.getElementById("consForm");
    const modelsContainer = document.getElementById("models");
    const loadModelsButton = document.getElementById('showmore');



    if (loadModelsButton) {
        loadModelsButton.addEventListener('click', () => {
            fetch('http://localhost:3001/catalog')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    data.forEach(item => {
                        const newModel = document.createElement('div');
                        newModel.classList.add('content');
    
                        const base64String = item.image;  
    
                        newModel.innerHTML = `
                            <div class="left-content">
                                <img src="data:image/jpeg;base64,${base64String}" alt="Фото автомобіля">
                            </div>
                            <div class="right-content">
                                <p>Модель: ${item.name}</p>
                                <p>Рік: ${item.year}</p>
                                <p>Ціна: ${item.price} $</p>
                                <p>Опис: ${item.description}</p>
                            </div>
                        `;
                        document.body.insertBefore(newModel, blogForm.parentElement);
    
                        
                        
                    });
                })
                .catch(error => console.error('Помилка при завантаженні моделей з бази даних:', error));
        });
    } else {
        console.error('Button with ID "showmore" not found.');
    }
    
   


    blogForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.getElementById("title").value;
        const year = document.getElementById("year").value;
        const price = document.getElementById("price").value;
        const descriptionV = document.getElementById("description").value;
        const fileInput = document.getElementById("file");
        const file = fileInput.files[0];

        const reader = new FileReader();
        reader.onload = function(event) {
        const base64String = event.target.result.split(',')[1];

            const data = JSON.stringify({
                name: title, 
                description: descriptionV,
                year: year,
                price: price,
                image: base64String
            });
            fetch('http://localhost:3001/catalog/postgresql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: data
            })
            .then(response => {
                if (response.ok) {
                    console.log('Модель успішно збережена до PostgreSQL');
                    const newModel = document.createElement('div');
                    newModel.classList.add('content');
                    newModel.innerHTML = `
                        <div class="left-content">
                        <img src="data:image/jpeg;base64,${base64String}"  alt="Фото автомобіля">
                        </div>
                        <div class="right-content">
                            <p>Модель: ${title}</p>
                            <p>Рік: ${year}</p>
                            <p>Ціна: ${price} $</p>
                            <p>Опис: ${descriptionV}</p>
                        </div>
                    `;
                    document.body.insertBefore(newModel, blogForm.parentElement);
                    blogForm.reset();
                } else {
                    console.error('Помилка при збереженні моделі до PostgreSQL:', response.statusText);
                }
            })
            .catch(error => console.error('Error saving post to PostgreSQL:', error));
        };
        
        reader.readAsDataURL(file);
    });
});