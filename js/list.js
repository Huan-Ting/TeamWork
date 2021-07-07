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

function layoutItems(items){
    let layout_var=document.getElementById('items_layout');
    layout_var.innerHTML="";
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
    })
}
/*layoutItems()*/


//讀取json file，將回傳的內容透過.json()轉成Object。再把裡面所需的資料放進前面寫好的layoutItems()功能裡面
function readJSONFile(file) {
    fetch(file).then(response => {
        return response.json();
    }).then(data => {
        layoutItems(data.items);
    });
}

readJSONFile("./seeders/item.json")



//讀取csv file，
