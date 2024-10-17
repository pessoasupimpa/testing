function fetchAddress(postalCode) {
    const url = `https://viacep.com.br/ws/${postalCode}/json/`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                document.getElementById('street').value = data.logradouro;
                document.getElementById('neighborhood').value = data.bairro;
                document.getElementById('city').value = data.localidade;
                document.getElementById('stateCode').value = data.uf;
                document.getElementById('state').value = data.uf;
            } else {
                alert('Postal code not found!');
            }
        })
        .catch(error => {
            console.error('Error fetching the postal code:', error);
        });
}

function saveToLocalStorage(data) {
    localStorage.setItem('userRegistration', JSON.stringify(data));
    alert('User registered successfully!');
    

    window.location.href = "acai.html";
}


document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const postalCode = document.getElementById('postalCode').value;
    const street = document.getElementById('street').value;
    const neighborhood = document.getElementById('neighborhood').value;
    const city = document.getElementById('city').value;
    const stateCode = document.getElementById('stateCode').value;
    const state = document.getElementById('state').value;

    const userData = {
        firstName,
        lastName,
        email,
        phone,
        postalCode,
        street,
        neighborhood,
        city,
        stateCode,
        state
    };

    saveToLocalStorage(userData);
});


document.getElementById('postalCode').addEventListener('blur', function() {
    const postalCode = this.value.replace(/\D/g, '');
    if (postalCode.length === 8) {
        fetchAddress(postalCode);
    } else {
        alert('Please enter a valid postal code.');
    }
});
