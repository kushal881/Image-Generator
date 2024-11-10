const key="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";
const inputText=document.getElementById("input");
const image=document.getElementById("image");
const Genbtn = document.getElementById("btn");
const svg=document.getElementById("svg");
const load=document.getElementById("loading");
const resetBtn=document.getElementById("reset");
const down = document.getElementById("download")
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
		{
			headers: {
				Authorization: `Bearer ${key}`
			},
			method: "POST",
			body: JSON.stringify({"inputs": inputText.value}),
		}
	);
	const result = await response.blob(data);
    image.style.display="block"
    load.style.display="none"
	return result;
}
async function generate() {
    load.style.display="block"
query().then((response) => {
	const objectUrl = URL.createObjectURL(response);
    image.src=objectUrl;
    down.addEventListener("click",()=>{
        download(objectUrl)
    })
});
}

Genbtn.addEventListener("click",()=>{
    svg.style.display="none"
    generate();
})

inputText.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
        svg.style.display="none"
        generate();
    }
})

resetBtn.addEventListener("click",()=>{
     inputText.value=""
     window.location.reload();
})

function download(objectUrl){

    fetch(objectUrl).then(res=>res.blob())
    .then(file=>{
        let a = document.createElement("a")
        a.href=URL.createObjectURL(file);
        a.download=new Date().getTime();
        a.click();
    })
    .catch(()=>alert("Failed Download!"));
}