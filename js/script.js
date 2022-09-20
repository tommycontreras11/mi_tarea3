const container = document.querySelector('.container');
const form = document.getElementById("form");
const url = "http://www.raydelto.org/agenda.php";
        

form.addEventListener("submit", async(e) => {
    e.preventDefault();

    const nombre = document.getElementById("inputnombre").value;
    const appelido = document.getElementById("inputapellido").value;
    const telefono = document.getElementById("inputtelefono").value;

    if(nombre != "" && appelido != "" && telefono != ""){
                
        const formData = new FormData(form);
        const formDataSerialized = Object.fromEntries(formData);
        console.log(formDataSerialized, "formDataSerialized");

        const jsonObject = {
            ...formDataSerialized,
            sendToSelf: formDataSerialized.sendToSelf ? true : false,
        };
        try 
        {
            const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(jsonObject),
            mode: 'no-cors',
            headers: {
                    'Content-Type': 'application/json'
            }
        });
                alert("Se ha guardado correctamente");
        }catch(e){
            console.error(e);
            alert("Ha ocurrido un error");
        }

    }else{
        alert("Debes de llenar todos los campos");
    }
               
});     
        
fetch(url).then(response => response.json())
.then(data => cargarDatos(data))
.catch(error => console.log(error))
        
function cargarDatos(data){
    const div = document.createElement('div');
    for(let i = 0; i < data.length; i++){
        div.innerHTML += `  
        <div class="resultado" id="content-result">
            <div class="content">
                <div class="result">
                    <label class="resultado-final" id="nombre" for="">Nombre: ${data[i].nombre}</label><br>
                    <label class="resultado-final" id="apellido" for="">Apelllido: ${data[i].apellido}</label><br>
                    <label class="resultado-final" id="telefono" for="">Teléfono: ${data[i].telefono}</label>
                </div>
            </div><br><br>
        </div>`
    }
    container.appendChild(div);
}