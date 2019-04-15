const input = document.querySelectorAll('.controls input');

function handleUpdate() {
    // console.log(this.value);
    const suffix = this.dataset.sizing || '';
    // console.log(this.dataset);
    // console.log(suffix);
    // console.log(this.name);
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

input.forEach(input => input.addEventListener('change', handleUpdate));
input.forEach(input => input.addEventListener('mousemove', handleUpdate));