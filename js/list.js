/*let cats=[
    {
        name:'Amiao',
        type:'Calico',
        age:3,
        gender:'Female',
        description:'Rub me plz',
        image_link:"./imgs/IMG_Amiao.jpg"
        },
    {
        name:'Rogie',
        type:'Chinchila',
        age:2,
        gender:'Male',
        description:'Food is everything',
        image_link:"./imgs/IMG_Rogie.jpeg"
        },  
    {
        name:'Mimi',
        type:'Chinchila',
        age:14,
        gender:'Female',
        description:'Such an angel',
        image_link: "./imgs/IMG_Mimi.jpeg"
        }, 
    {
        name:'Ben',
        type:'Tabby',
        age:1,
        gender:'Male',
        description:'Brave boy',
        image_link: "./imgs/IMG_Ben.jpeg"
        }, 
    {
        name:'Jhu',
        type:'Ginger',
        age:1,
        gender:'Male',
        description:'Always patient',
        image_link: "./imgs/IMG_Jhu.jpeg"
        },
    {
        name:'Snowflake Cake',            
        type:'Tabby',
        age:3,
        gender:'Female',
        description:'Invisibility is my superpower',
        image_link: "./imgs/IMG_Snow.jpg"
        } 
];*/

let typeCategorySet = new Set();
let totalItems = [];
let typeFilter = "All";

function layoutItems(items){
    let layout_var=document.getElementById('items_layout');
    layout_var.innerHTML = '<div id="filter-division" class="filter-division"></div>';
    
    /*
    function constructItemsHTML(item){
        let item_html="";
        item_html+="<div class=item>";
        item_html+='<div class=item_img><img scr="'+item.image_link+'"/></div>';
        item_html+='<div class=item_name>'+item.name+'</div>';
        item_html+='<div class=item_type>'+item.type+'</div>';
        item_html+='<div class=item_body>';
        item_html+='<div class=item_attr><ul><li>'+item.age+'</li><li>'+item.gender+'</li><li>'+item.description+'</li></ul></div>';
        item_html+='</div>';
        item_html+='</div>';

        layout_var.innerHTML+=item_html;
    };*/
    
    items.forEach(function(item){
        let item_html="";
        item_html+="<div class=item>";
        item_html+='<div class=item_img><img src="'+item.image_link+'"/></div>';
        item_html+='<div><span class=item_name>'+item.name+'</span>';
        item_html+='<span class=item_type>'+item.type+'</span></div>';
        item_html+='<div class=item_body>';
        item_html+='<div class=item_attr><ul><li>age:'+item.age+'</li><li>'+item.gender+'</li><li>'+item.description+'</li></ul></div>';
        item_html+='</div>';
        item_html+='</div>';

        layout_var.innerHTML+=item_html;
        typeCategorySet.add(item.type);
    })
    
    renderDataFilter();
}
/*layoutItems()*/

function rerenderItemsByTypeFilter(type) {
    typeFilter = type;
    let filterItems = (typeFilter === "All") ? totalItems : totalItems.filter((item)=>{
        return item.type === type;
    })
    layoutItems(filterItems);
}

function renderDataFilter() {
    const typeCategoryArray = Array.from(typeCategorySet)
    items_layout.innerHTML +=
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



//讀取csv file，
