
let map = L.map('map');
const API_IP = "https://geo.ipify.org/api/v2/country,city?apiKey=at_fxLZtlkGI2Zs0Ez9JYCzvulFT9hyh";
const INFO = document.querySelector('.info');
const INPUT = document.querySelector('.searchbar-input');


function createMap(x,y) {
          
          map.setView([x, y], 6);
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);
          
          L.marker([x, y]).addTo(map)
          .bindPopup('Your location.')
          .openPopup();
          
}

function getIp(API_IP) {
          fetch(API_IP).
                    then(response => response.json()).
                    then(data => createINFO(data)).
                    catch( error => INFO.innerHTML = `Error: ${error}`);
}

function createINFO(data) {
          INFO.innerHTML = `
          <div>
          <h2>IP ADDRESS</h2>
          <div>${data.ip}</div>
          </div>
          <div>
          <h2>LOCATION</h2>
          <div>${data.location.region}, ${data.location.country}</div>
          </div>
          <div>
          <h2>TIMEZONE</h2>
          <div>UTC ${data.location.timezone}</div>
          </div>
          <div>
          <h2>ISP</h2>
          <div>${data.isp}</div>
          </div>
          `;

          createMap(data.location.lat, data.location.lng);

}

function searchIP(e) {
          if (e.key == "Enter") {
                    getIp(API_IP+`&ipAddress=${INPUT.value}`);
          }
}

function searchIP2() {
          getIp(API_IP+`&ipAddress=${INPUT.value}`);
}

getIp(API_IP);

INPUT.addEventListener('keydown', searchIP);
document.querySelector('.seachbar-button').addEventListener('click', searchIP2);

