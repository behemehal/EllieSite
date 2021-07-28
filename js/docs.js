document.querySelectorAll(".menu-btn div").forEach(x => {
	x.onclick = () => {
		 if (!x.classList.contains("menu-btn-open")) {
		 		document.querySelector(".docs-container").classList.remove("menu-open")
				document.querySelector(".docs-container").classList.add("menu-close")
		 } else {
				document.querySelector(".docs-container").classList.remove("menu-close")
				document.querySelector(".docs-container").classList.add("menu-open")
			}
	}
})

document.querySelectorAll(".item-bl").forEach(x => {
	x.childNodes[0].onclick = () => {
		 if (x.classList.contains("active")) {
		 		x.classList.remove("active")
		 } else {
		 		x.classList.add("active")
			}
	}
})