// Animasi Background
const keyframesPulse = `@keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 0.6; } }`;
const keyframesSpin = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
const style = document.createElement('style');
style.textContent = keyframesPulse + keyframesSpin;
document.head.appendChild(style);

// --- LOGIKA NAVIGASI SLIDE SUPER SMOOTH ---
function changeSlide(direction) {
    const current = document.querySelector('.slide-container.active');
    const currentId = parseInt(current.id.replace('slide-', ''));
    const nextId = currentId + direction;
    const nextSlide = document.getElementById(`slide-${nextId}`);

    if (nextSlide) {
        // 1. Halaman saat ini keluar perlahan
        current.classList.remove('active');
        current.style.transform = direction > 0 ? 'translateX(-100px)' : 'translateX(100px)';

        // 2. Pindahkan halaman baru ke titik awal (secara instan/kilat)
        nextSlide.style.transition = 'none';
        nextSlide.style.transform = direction > 0 ? 'translateX(100px)' : 'translateX(-100px)';

        // 3. Trik rahasia: Paksa browser membaca posisi baru sebelum animasi jalan
        nextSlide.offsetHeight; 

        // 4. Nyalakan lagi transisi elegannya, lalu masukkan halaman baru
        nextSlide.style.transition = 'all 0.9s cubic-bezier(0.16, 1, 0.5, 1)';
        nextSlide.classList.add('active');
        nextSlide.style.transform = 'translateX(0)';
    }
}

// --- EFEK 3D KARTU ---
function handleMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
}

function handleLeave(card) {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
}