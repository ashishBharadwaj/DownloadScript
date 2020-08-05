debugger;
let dir = [];
let sections = document.getElementsByClassName('row lecture-sidebar')[0].children; 
for(let i=0;i<sections.length;i++){
    let section;
    let sectionName;
    try{
        section = sections[i].children[1].children;
        sectionName = sections[i].children[0].innerText.trim();
        let obj = {
            sectionName: sectionName,
            videos:[]
        };
        for(let j=0;j<section.length;j++){
            let url;
            let videoName;
            try{
                url = section[j].children[0].href;
                videoName = section[j].children[0].children[1].innerText.trim();
                let innerObj = {
                    name: videoName,
                    link: url
                };
                obj.videos.push(innerObj);
                section[j].children[0].click();
            }
            catch(error){
                debugger;
                console.log(error);
            }
            
        }
        dir.push(obj);
    }
    catch(eror)
    {
        debugger;
        console.log(eror);
    }
    
}
debugger;
console.log(dir);

for(let i = 0;i< dir.length;i++){
    for(let j = 0; j < dir[i].videos.length;j++)
    {
        this.document.location = dir[i].videos[j].link;
    }
}