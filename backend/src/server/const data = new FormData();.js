const data = new FormData();
data.append("tipo", "Apartamento");
data.append("ubicacion", "UbicacionEjemplo");
data.append("precio", 200000);
data.append("superficie", 2000);
data.append("habitaciones", 3);
data.append("bathrooms", 2);
data.append("descripcion", "Descripción opcional de la casa");
data.append("estado", "CasiNuevo");
data.append("antiguedad", "MenosDe1");
data.append("tipoTransaccion", "Venta");
data.append("numPisos", 2);
data.append("ascensor", false);
data.append("seguridad", true);
data.append("piscina", false);
data.append("cocina", true);
data.append("parqueadero", true);
data.append("jardin", false);
data.append("amoblado", true);
data.append("balcon", false);
data.append("terraza", true);
data.append("calefaccion", false);

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "http://localhost:4000/api/v1/casa");
xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNzA1NjI4MTI5LCJleHAiOjE3MDgyMjAxMjl9.sEwqpG7k7T27fJ8ARdpQSAOsbJ1LAWJS9zbERVpV5P8");

xhr.send(data);