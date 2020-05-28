(function(win, doc, $) {
  'use strict';
  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  let app = (function() {
    let $h1Header = $('[data-js="h1"]')
    let $img = $('[data-js="image"]')
    let $brand = $('[data-js="brand"]')
    let $year = $('[data-js="year"]')
    let $licensePlate = $('[data-js="licensePlate"]')
    let $color = $('[data-js="color"]')
    let $button = $('[data-js="button"]')
    let $tbody = $('[data-js="tbody"]')

    let ajax = new XMLHttpRequest()
    let ajaxJson

    return {
      init: function init() {
        this.openAjax()
        this.initListener()
      },

      openAjax: function openAjax() {
      ajax.open('GET', 'company.json')
      ajax.send()
      ajax.addEventListener('readystatechange', app.ajaxCallback, false)
      },

      ajaxCallback:  function ajaxCallback(){
        if (ajax.readyState === 3){
          ajaxJson = JSON.parse(ajax.responseText)
          app.headerJsonChanger()
        }
      },

      headerJsonChanger: function headerJsonChanger(){
        let headerH1Text = doc.createTextNode(ajaxJson.name) //nome
        $h1Header.replaceChild(headerH1Text, $h1Header.lastChild)
        let numberHeader = doc.createElement('h1') //numero
        let headerH12 = doc.createTextNode(' - ' + ajaxJson.phone)
        let newH6 = numberHeader.appendChild(headerH12)
        $h1Header.appendChild(headerH12)
      },

      createImgTd: function createImgTd() {
        let imgTd = doc.createElement('td')
        let imgTag = doc.createElement('img')
        imgTag.setAttribute('src', $img.value)
        imgTd.appendChild(imgTag)
        return imgTd
      },

      createBrandTd: function createBrandTd() {
        let brandTd = doc.createElement('td')
        brandTd.textContent = $brand.value
        return brandTd
      },

      createYearTd: function createYearTd() {
        let yearTd = doc.createElement('td')
        yearTd.textContent = $year.value
        return yearTd
      },

      createLicensePlateTd: function createLicensePlateTd() {
        let licensePlateTd = doc.createElement('td')
        licensePlateTd.textContent = $licensePlate.value
        return licensePlateTd
      },

      createColorTd: function createColorTd() {
        let colorTd = doc.createElement('td')
        colorTd.textContent = $color.value
        return colorTd
      },

      createTr: function createTr(){
        let fragmentTr = doc.createDocumentFragment()
        let tr = doc.createElement('tr')
        tr.appendChild(this.createImgTd())
        tr.appendChild(this.createBrandTd())
        tr.appendChild(this.createYearTd())
        tr.appendChild(this.createLicensePlateTd())
        tr.appendChild(this.createColorTd())
        fragmentTr.appendChild(tr)
        return fragmentTr
      },

      handdleTable: function handdleTable(event){
        console.log($color)
        event.preventDefault()
        $tbody.appendChild(app.createTr())
      },

      initListener: function initListener() {
        $button.addEventListener('click', app.handdleTable, false)
      }
  }
  })()

  app.init()

  window.app = app

})(window, document, window.DOM)
