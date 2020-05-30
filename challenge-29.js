(function(win, doc, $) {
  'use strict';
  let app = (function() {
    let $h1Header = $('[data-js="h1"]')
    let $img = $('[data-js="image"]')
    let $brand = $('[data-js="brand"]')
    let $year = $('[data-js="year"]')
    let $licensePlate = $('[data-js="licensePlate"]')
    let $color = $('[data-js="color"]')
    let $button = $('[data-js="button"]')
    let $tbody = $('[data-js="tbody"]')
    let $allInputs = $('input')

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
        let headerH1Text = doc.createTextNode(ajaxJson.name)
        $h1Header.replaceChild(headerH1Text, $h1Header.lastChild)
        let headerH12 = doc.createTextNode(' - ' + ajaxJson.phone)
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

      createButtonRemove: function createButtonRemove() {
        let buttonRemoveTd = doc.createElement('td')
        buttonRemoveTd.innerHTML += `
        <td>
          <button onClick="app.removeTr()"data-js="buttonNumber-${$tbody.children.length + 1}">
              Remover
          </button>
        </td>`
        return buttonRemoveTd
      },


      createTr: function createTr(){
        let fragmentTr = doc.createDocumentFragment()
        let tr = doc.createElement('tr')
        tr.appendChild(this.createImgTd())
        tr.appendChild(this.createBrandTd())
        tr.appendChild(this.createYearTd())
        tr.appendChild(this.createLicensePlateTd())
        tr.appendChild(this.createColorTd())
        tr.appendChild(this.createButtonRemove())
        tr.setAttribute('data-js', `trNumber-${$tbody.children.length + 1}`)
        fragmentTr.appendChild(tr)
        return fragmentTr
      },

      removeTr: function removeTr() {
        let element1 = $(`[data-js="buttonNumber-${tbody.children.length}"]`)
        let element2 = element1.parentNode
        $tbody.removeChild(element2.parentNode)
      },

      cleanInputs: function cleanInputs() {
        $allInputs.map(function callBack(item, index){          
          item.value = null
        })
      },

      handdleTable: function handdleTable(event){
        event.preventDefault()
        $tbody.appendChild(app.createTr())
        app.cleanInputs()
      },

      initListener: function initListener() {
        $button.addEventListener('click', app.handdleTable, false)
      }
  }
  })()

  app.init()

  window.app = app

})(window, document, window.DOM)
