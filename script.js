let button = document.querySelector("button")
let container = document.querySelector(".container")
let error = document.querySelector(".error")



let cargarCiudad = (ciudadElegida) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudadElegida}&lang=sp&appid=7f5482804e804c168f596be3f1c6ed56`)
        .then( (resp) => resp.json() )
        .then( (data) => {
            if(data.cod === "404"){
                console.log("Ciudad no encontrada")
                container.style.visibility="hidden"
                error.style.display = "flex"
            } else {
                console.log(data)
                let {name, main:{temp, temp_min, temp_max}, weather:[arr], sys:{country}} = data
                error.style.display = "none"
                container.style.visibility = "visible"
                document.querySelector("#ciudad").textContent = name
                document.querySelector("#temperatura").textContent = parseInt(temp-273.15) + "°C"
                document.querySelector("#wicon").src = `https://openweathermap.org/img/wn/${arr.icon}@2x.png`
                document.querySelector("#descripcion").textContent = arr.description
                document.querySelector("#max-min").textContent = parseInt(temp_max-273.15) + "°C / " + parseInt(temp_min-273.15) + "°C"
            }
        } )
}

//let cargarPais = (cod) => {
//    fetch(`https://restcountries.com/v3.1/alpha/${cod}`)
//        .then((resp, data) => {
//            resp.json()
//        })
//        .then( (data) => {
//            console.log(data[0].name.common)
//            return data[0].name.common
//        })
//}


button.addEventListener("click",() => {
    let input = document.querySelector("input")
    let ciudad = input.value
    cargarCiudad(ciudad)
})