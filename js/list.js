let typeCategorySet = new Set();
let totalItems = [];
let typeFilter = "All";
let currentPage=1;
let totalPage=0;
const numbersInaPage=4
let items_layout_query=document.getElementById('items_layout');


function renderPagitation(){
    let pagination_html="";
    pagination_html+= 
                `<div class="pagination_div">
                    <ul  class="pagination">
                        <li ${(currentPage===1)?'class="disabled"':'onclick="afterPushButtonPutVarIn(1)"'} ><<</li>
                        <li ${(currentPage===1)?'class="disabled"':`onclick="afterPushButtonPutVarIn(${currentPage-1})"`}><</li>
                        ${createPagitationList()}
                        <li ${(currentPage===totalPage)?'class="disabled"':`onclick="afterPushButtonPutVarIn(${currentPage+1})"`}>></li>
                        <li ${(currentPage===totalPage)?'class="disabled"':'onclick="afterPushButtonPutVarIn(totalPage)"'}>>></li>
                    </ul>
                </div>`
                items_layout_query.innerHTML+=pagination_html;
}


function createPagitationList(){
    let totalPage_Array=new Array(totalPage);
    for(let i=1;i<=totalPage;i++){
        totalPage_Array[i]=i;
    }
    return totalPage_Array.reduce((accmulator,currentValue)=>{
        return accmulator+=`<li ${(currentPage===currentValue)?'class="active"':`onclick="afterPushButtonPutVarIn(${currentValue})"`}>${currentValue}</li>`
    },"") //最後要加 " " ：是initial value，加initial value來告訴電腦return value 的type，例如要產出array就加[]
}


function afterPushButtonPutVarIn(page){
    currentPage=page;
    items_layout_query.innerHTML="";
    layoutItems(totalItems);
}


function rerenderItemsByTypeFilter(type) {
    typeFilter = type;
    let filterItems = (typeFilter === "All") ? totalItems : totalItems.filter((item)=>{
        return item.type === type;
    })
    currentPage = 1;
    layoutItems(filterItems);
}


function renderDataFilter() {
    const typeCategoryArray = Array.from(typeCategorySet)
    items_layout_query.innerHTML +=
        `<div id="filter-element" class="filter-element">
            <span>Type:</span>
            <select onchange="rerenderItemsByTypeFilter(this.options[this.selectedIndex].value);">
                <option value="All">All</option>
                ${ typeCategoryArray.reduce((accumulator, currentValue, currentIndex)=>{
                    return accumulator += `<option value="${currentValue}" ${typeFilter === currentValue ? "selected":""}>${currentValue}</option>`
                }, "")}
            </select>
        </div>`
    document.getElementById('filter-division').appendChild(document.getElementById('filter-element'));
}


function layoutItems(items){
    items_layout_query.innerHTML = '<div id="filter-division" class="filter-division"></div>';
    
    totalPage= Math.floor((items.length-1)/4)+1;
    const itemsInCertainPage=items.slice((currentPage-1)*numbersInaPage,currentPage*numbersInaPage);
    renderPagitation();

    totalItems.forEach(function(item){typeCategorySet.add(item.type);})

    itemsInCertainPage.forEach(function(item){
        let item_html="";
        item_html+="<div class=item>";
        item_html+='<div class=item_img><img src="'+item.image_link+'"/></div>';
        item_html+='<div><span class=item_name>'+item.name+'</span>';
        item_html+='<span class=item_type>'+item.type+'</span></div>';
        item_html+='<div class=item_body>';
        item_html+='<div class=item_attr><ul><li>age:'+item.age+'</li><li>'+item.gender+'</li><li>'+item.description+'</li></ul></div>';
        item_html+='</div>';
        item_html+='</div>';

        items_layout_query.innerHTML+=item_html;
    })
    
    renderPagitation();
    renderDataFilter();
}


//讀取json file，將回傳的內容透過.json()轉成Object。再把裡面所需的資料放進前面寫好的layoutItems()功能裡面
function readJSONFile(file) {
    fetch(file).then(response => {
        return response.json();
    }).then(data => {
        totalItems = data.items;
        layoutItems(totalItems);
    });
}

readJSONFile("./seeders/item.json")
