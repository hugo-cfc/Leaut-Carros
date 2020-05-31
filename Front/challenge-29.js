(function (win, doc, $) {
  "use strict";
  const app = (() => {
    const $h1Header = $('[data-js="h1"]');
    const $img = $('[data-js="image"]');
    const $brand = $('[data-js="brand"]');
    const $year = $('[data-js="year"]');
    const $licensePlate = $('[data-js="licensePlate"]');
    const $color = $('[data-js="color"]');
    const $button = $('[data-js="button"]');
    const $tbody = $('[data-js="tbody"]');
    const $allInputs = $("input");

    const ajax = new XMLHttpRequest();
    let ajaxJson;

    return {
      init: function init() {
        this.openAjax();
        this.initListener();
        this.listCars()
      },

      openAjax: () => {
        ajax.open("GET", "company.json");
        ajax.send();
        ajax.addEventListener("readystatechange", app.ajaxCallback, false);
      },

      ajaxCallback: function ajaxCallback() {
        if (ajax.readyState === 4) {
          ajaxJson = JSON.parse(ajax.responseText);
          app.headerJsonChanger();
        }
      },

      headerJsonChanger: () => {
        let headerH1Text = doc.createTextNode(ajaxJson.name);
        $h1Header.replaceChild(headerH1Text, $h1Header.lastChild);
        let headerH12 = doc.createTextNode(" - " + ajaxJson.phone);
        $h1Header.appendChild(headerH12);
      },

      createImgTd: (img) => {
        let imgTd = doc.createElement("td");
        let imgTag = doc.createElement("img");
        imgTag.setAttribute("src", img);
        imgTd.appendChild(imgTag);
        return imgTd;
      },

      createBrandTd: (brand) => {
        let brandTd = doc.createElement("td");
        brandTd.textContent = brand
        return brandTd;
      },

      createYearTd: (year) => {
        let yearTd = doc.createElement("td");
        yearTd.textContent = year
        return yearTd;
      },

      createLicensePlateTd: (licensePlate) => {
        let licensePlateTd = doc.createElement("td");
        licensePlateTd.textContent = licensePlate
        return licensePlateTd;
      },

      createColorTd: (color) => {
        let colorTd = doc.createElement("td");
        colorTd.textContent = color
        return colorTd;
      },

      createButtonRemove: () => {
        let buttonRemoveTd = doc.createElement("td");
        buttonRemoveTd.innerHTML += `
        <td>
          <button onClick="app.removeTr()"data-js="buttonNumber-${
            $tbody.children.length + 1
          }">
              Remover
          </button>
        </td>`;
        return buttonRemoveTd;
      },

      createTr: function createTr(img, brand, year, licensePlate, color) {
        let fragmentTr = doc.createDocumentFragment();
        let tr = doc.createElement("tr");
        tr.appendChild(this.createImgTd(img));
        tr.appendChild(this.createBrandTd(brand));
        tr.appendChild(this.createYearTd(year));
        tr.appendChild(this.createLicensePlateTd(licensePlate));
        tr.appendChild(this.createColorTd(color));
        tr.appendChild(this.createButtonRemove());
        tr.setAttribute("data-js", `trNumber-${$tbody.children.length + 1}`);
        fragmentTr.appendChild(tr);
        return fragmentTr;
      },

      removeTr: () => {
        let element1 = $(`[data-js="buttonNumber-${tbody.children.length}"]`);
        let element2 = element1.parentNode;
        $tbody.removeChild(element2.parentNode);
      },

      cleanInputs: () => {
        $allInputs.map(function callBack(item, index) {
          item.value = null;
        });
      },

      handdleTable: function handdleTable(event) {
        event.preventDefault();        
        app.createNewCar()
        app.cleanInputs();
        app.lastCarAdd()
      },

      initListener: () => {
        $button.addEventListener("click", app.handdleTable, false);
      },

      listCars: () => {
        const ajaxGetCars = new XMLHttpRequest()
        ajaxGetCars.open('GET', 'http://localhost:3000/cars')
        ajaxGetCars.send()

        ajaxGetCars.onreadystatechange = function() {
          if(ajaxGetCars.readyState === 4) {
            JSON.parse(ajaxGetCars.responseText).map(function(item) {
              $tbody.appendChild(app.createTr(item.img, item.brand, item.year, item.licensePlate, item.color));
            })
          }
        }
      },

      lastCarAdd: function() {
        const ajaxGetCars = new XMLHttpRequest()
        ajaxGetCars.open('GET', 'http://localhost:3000/cars')
        ajaxGetCars.send()

        ajaxGetCars.onreadystatechange = function() {
          if(ajaxGetCars.readyState === 4) {
            let lastCarAdd = JSON.parse(ajaxGetCars.responseText)
            let lastCarAddSet = lastCarAdd[lastCarAdd.length - 1]
            $tbody.appendChild(app.createTr(lastCarAddSet.img, lastCarAddSet.brand, lastCarAddSet.year, lastCarAddSet.licensePlate, lastCarAddSet.color)) 
            
          }
        }
      },
      
      createNewCar: () => {
        const ajaxPostCars = new XMLHttpRequest()
        ajaxPostCars.open('POST', 'http://localhost:3000/cars')
        ajaxPostCars.setRequestHeader('content-Type', 'application/x-www-form-urlencoded')
        ajaxPostCars.send(`img=${$img.value}&brand=${$brand.value}&year=${$year.value}&licenseplate=${$licensePlate.value}&color=${$color.value}`)

        ajaxPostCars.onreadystatechange = function() {
          if(ajaxPostCars.readyState ===4) {
            console.log('Carro cadastrado com sucesso!', ajaxPostCars.responseText)
          }
        }
      }
    };
  })();

  app.init();

  window.app = app;
})(window, document, window.DOM);
