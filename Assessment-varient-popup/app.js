(function ($, jQuery) {
    const startBtn = document.getElementById('startquiz');
    const closeBtn = document.getElementById('closequiz');
    const quizWrap = document.querySelector('.quizcontainer');
    const optionHeadline = document.querySelector('#question');
    const categoryList = document.querySelector('.showHtml');
    const progressBar = document.querySelector('.progress-bar')
    const optionAttr = startBtn.dataset.option;
    const template = Handlebars.templates["result.tmpl"];
    const schwarz_logo = document.querySelector('.schwarz-logo');
    let optionId;  
   //let elementClick = document.querySelector('.showHtml .category');
    let currentSku;
    let currentVariant;

    function mobileLogo() {
        let containerlen = document.getElementsByClassName("category").length;
        if (containerlen > 0) {
            schwarz_logo.classList.add('mobile');
        }
        else {
            schwarz_logo.classList.remove('mobile');
        }
    }

    function actionEle(){       
        const listEle = document.querySelectorAll('.category');
            for (let i=0; i<listEle.length; ++i) {
               listEle[i].addEventListener('click', getAttr);
            }
            function getAttr() {
                 const currEleId = document.getElementById(this.id);
                 const currEleAttr = currEleId.getAttribute('data-option');
                 switchQuiz(currEleAttr);
            }
    }
    
    function switchQuiz(currentOption) {
        const switchBtn = currentOption == "close" ? 'hide' : 'show';
        startBtn.classList = `start-btn ${switchBtn}`;
        startBtn.setAttribute('omnitag', 'restart quiz');
        quizWrap.classList.add('active');
        startBtn.textContent = 'Restart quiz';
        categoryList.classList.remove('resulttmpl');   
        currentSku = '';    
        colorList(currentOption);
        mobileLogo();
        actionEle()
    }

    function closeQuiz() {
        startBtn.classList = `start-btn show`;
        quizWrap.classList.remove('active');
        startBtn.textContent = 'Start quiz';
        categoryList.innerHTML = '';
        currentSku = '';
        schwarz_logo.classList.remove('mobile');
        categoryList.classList.remove('resulttmpl');
        startBtn.setAttribute('omnitag', 'start quiz');       
    }
   
    function colorList(currOption) {
        const result = color[currOption].progress == 5 ? true : false;

        let showHtml = '';
        optionHeadline.innerHTML = color[currOption].question;
        progressBar.querySelector('span').classList = `level-${color[currOption].progress}`;

        if (result) {           
            categoryList.classList.add(result == true ? 'resulttmpl' : '');
            resultData = color[currOption];
            showHtml = template(resultData);
            currentSku = color[currOption].sku  
            currentVariant = color[currOption].variant;        
        }
        else {
            color[currOption].options.forEach(e => {
                const colorselect = currOption !== 'q1' ? 'colorselect' : '';
                let innerimgtext = e.innerimgtext ? 'innerimgtext' : '';
                let count = 0;
                if (e.option) {
                    e.option.forEach(sub => {
                        optionId = Math.random();
                        showHtml += `<div id='${optionId}' class='category ${colorselect} trackMe' data-option="${e.subkey}" omnitag='${e.omnitag[count]}' >
                                        <div class='inner-content'><img src='${e.img[count]}' alt=''/></div>
                                        <span class='${innerimgtext}'> ${sub}</span>
                                    </div>`;
                        count++;

                    });
                }
            });
        }
        categoryList.innerHTML = showHtml;

        var dynamicprice;
      //  var onLoadParentDoc = window.parent.document;

        dynamicprice = $(".dynpricing-scroller").hasClass('slick-initialized');
        if (dynamicprice) {
            $('.dynpricing-scroller').slick('unslick');
        }

        $('.dynpricing-scroller .prod').dynpricing({
            /* if you copy this file, your custom dynpricing settings go here */
            stayOnPage: true,
            modalOutsideFrame: true
        });
        $('.dynpricing-scroller').slick({
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: false,
            respondTo: 'slider',
            dots: true,
            dotsClass: 'carousel-paginator-list',
            prevArrow: '<button type=\'button\' class=\'elc-icon paginator-hairline-btn elc-icon-angle-left hide-content display-inline-block-m trackMe\' omnitag=\'products Previous Slide\' omniint=\'interaction\'><span class=\'visuallyhidden\'>Previous</span></button>',
            nextArrow: '<button type=\'button\' class=\'elc-icon paginator-hairline-btn elc-icon-angle-right hide-content display-inline-block-m trackMe\' omnitag=\'products Next Slide\' omniint=\'interaction\'><span class=\'visuallyhidden\'>Next</span></button>',
            customPaging: function (slider, i) {
                return '<button type=\'button\' data-role=\'none\' class=\'carousel-paginator-item trackMe\' omniint=\'Interaction\' omnitag=\'products pagination_' +
                    (i + 1) + '\'>' + (i + 1) + '</button>';
            }
        });  
        if(currentSku){
            variantCall(currentVariant)
        }        
    }

    function variantCall(currentVariant){    
        let separateSku= currentVariant.split(',');        
        const skuWrap = document.querySelector('.dynpricing-scroller .Tile-content');
        let colorVariantWrap= document.createElement('div');
         colorVariantWrap.classList = 'custom-color-wrap'; 
        let customColorWrap = '';       
        const spliceVal = 6;

        function containerElement(separateSku){
            separateSku.forEach(sku =>{customColorWrap+=`<div class='varient-color  trackMe' omnitag='Color variant ${sku} ' id='${sku}' style='background-image:url(${structure[sku].bg})'  data-price='" + ${structure[sku].price}' data-title='${structure[sku].title}' data-img='${structure[sku].img}' data-link='${structure[sku].link}' ></div>`;        
            }); 
            colorVariantWrap.innerHTML = customColorWrap;
            skuWrap.prepend(colorVariantWrap); 
        }

        function popupElement(separateSku){
            let customColorPopup = ''; 
            const addPlusSymb = document.createElement('div');
            addPlusSymb.className ='plus-container';

            addPlusSymb.innerHTML = `<img class="plus trackMe" omnitag="Color popup" src="https://i5.walmartimages.com/dfw/4ff9c6c9-e8ce/k2-_529e3e74-edd0-4bef-9750-463a9cd639a0.v1.png" />`; 
            
            separateSku.forEach(sku =>{customColorPopup+=`<div class='varient-color trackMe' omnitag='Color variant ${sku} ' id='${sku}' style='background-image:url(${structure[sku].bg})'  data-price='" + ${structure[sku].price}' data-title='${structure[sku].title}' data-img='${structure[sku].img}' data-link='${structure[sku].link}' ></div>`;        
             });

            const popupContain = document.createElement('div');
            popupContain.classList= 'popup-contaoiner';
            popupContain.innerHTML =`<div class='popup-wrap'>
            ${customColorPopup}
            </div> `;
            colorVariantWrap.append( popupContain);          
            colorVariantWrap.append(addPlusSymb);          
            
            const showPopup= document.querySelector('.custom-color-wrap .plus-container');                 
            showPopup.addEventListener('click', ()=>{ popupContain.classList.toggle("active")});  
        }

        if(separateSku.length > spliceVal){ 
            let maxSku = separateSku.splice(0,spliceVal);            
            containerElement(maxSku);
            popupElement(separateSku);           
        }else{            
           containerElement(separateSku);          
        }

       productAction();
    }
   

    function productAction(){
        let listEle = document.querySelectorAll('.dynpricing-scroller .varient-color');        
        let productLink =  document.querySelector('.dynpricing-scroller .Tile-linkOverlay.js-tile-link-overlay');
        let productLinkImg = document.querySelector('.dynpricing-scroller .product-image');
        let productLinkTitle = document.querySelector('.dynpricing-scroller .js-product-title');
        let productPrice = document.querySelector('.dynpricing-scroller .Tile-priceContent .Price-display.display-inline.font-semibold');
        let activeSku =  currentSku;       
            for (let i=0; i<listEle.length; i++) {   
                listEle[i].addEventListener('click',clkProdsAttrChange);            
                listEle[i].addEventListener( 'mouseover',mouseoverProds);
                listEle[i].addEventListener( 'mouseleave',mouseleaveProds);
            }
            function activeClassAdd(elmId){              
                let elems = document.querySelector(".dynpricing-scroller .varient-color.active");               
                if(elems !=null) {                                                    
                    elems.classList.remove("active");
                }
                document.getElementById(elmId).classList.add('active');                              
            } 
            function switchProduct(activeSku){
                productLink.setAttribute('href', `${structure[activeSku].link}`)
                productLink.setAttribute('omnitag',`Add to cart - ${activeSku} - product`);               
                productLinkImg.setAttribute('src', structure[activeSku].img,); 
                productLinkTitle.innerHTML= structure[activeSku].title;                
                productPrice.innerHTML=structure[activeSku].price;
                activeClassAdd(activeSku);                
            }

            function clkProdsAttrChange() {              
                activeSku =  this.id;
                currentSku = activeSku;
                switchProduct(activeSku);                               
            }

            function mouseoverProds(){              
                const prodEleId = this.id;
                activeClassAdd(prodEleId);              
                productLinkImg.setAttribute('src', structure[prodEleId].img);                 
            }

            function mouseleaveProds(){               
                document.getElementById(this.id).classList.remove('active'); 
                let checkId = document.getElementById(currentSku) 
                if( checkId == null){                   
                   const firstEleId =  document.querySelector('.custom-color-wrap').firstElementChild.getAttribute('id');
                   switchProduct(firstEleId);
                }else{                   
                    switchProduct(currentSku);
                }          
               
            }                        
    }
   

    
    startBtn.addEventListener('click', e => { e.preventDefault(); switchQuiz(optionAttr) });
    closeBtn.addEventListener('click', e => { e.preventDefault(); closeQuiz() });
    //elementClick.addEventListener('click', e => { const currentDataAttr = e.target.closest('.category').dataset.option; switchQuiz(currentDataAttr); });
    //document.addEventListener

})(TRM.$, TRM.$);