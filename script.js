// NOTE: เปลี่ยน URL นี้เป็น Web App URL ของคุณที่ได้จากการ Deploy Google Apps Script (Code.gs)
// const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyqZGYpEdsK16zZixGcXVEzZPIJDhcZfGFJ5n7TErK6EqLkRVNYdummA6zTg0S5KrN5gg/exec';
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwHTQSl44aqEmI71tMpdDc7ICCeFK3x409pngQ0zj_8Z_QVJ-fOXJjvhamHX2W5G4DydA/exec';

let currentPrompts = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchTypes(); // โหลดแค่หมวดหมู่ตอนเปิดหน้า

    const toggleFormBtn = document.getElementById('toggleFormBtn');
    const formContainer = document.getElementById('formContainer');

    toggleFormBtn.addEventListener('click', () => {
        if (formContainer.style.display === 'none') {
            formContainer.style.display = 'block';
            toggleFormBtn.innerHTML = '<span style="font-size: 1.2em; font-weight: 900; margin-right: 4px;">&times;</span> ปิดฟอร์มบันทึก';
            toggleFormBtn.style.backgroundColor = '#f44336';
        } else {
            formContainer.style.display = 'none';
            toggleFormBtn.innerHTML = '<span style="font-size: 1.2em; font-weight: 900; margin-right: 4px;">+</span> เพิ่ม Prompt ใหม่';
            toggleFormBtn.style.backgroundColor = 'var(--primary-color)';
        }
    });

    const form = document.getElementById('promptForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
            alert('กรุณาตั้งค่า SCRIPT_URL ในไฟล์ script.js เป็น Web App URL ของคุณก่อนใช้งาน');
            return;
        }

        const submitBtn = document.getElementById('submitBtn');
        const statusMsg = document.getElementById('statusMessage');

        submitBtn.disabled = true;
        submitBtn.textContent = 'กำลังบันทึก...';
        statusMsg.textContent = '';
        statusMsg.className = '';

        const formData = new FormData(form);
        const data = {
            action: 'addPrompt',
            type: formData.get('type'),
            usefor: formData.get('usefor'),
            prompt: formData.get('prompt'),
            note: formData.get('note')
        };

        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.status === 'success') {
                statusMsg.textContent = 'บันทึกสำเร็จ!';
                statusMsg.className = 'success';
                form.reset();
                const addedType = formData.get('type');
                fetchTypes().then(() => {
                    document.getElementById('filterType').value = addedType;
                });
                fetchPrompts(addedType); // ดึงข้อมูลเฉพาะหมวดหมู่ที่เพิ่งเพิ่มเข้าไปมาแสดง

                // ซ่อนฟอร์มเมื่อบันทึกเสร็จ
                setTimeout(() => {
                    formContainer.style.display = 'none';
                    toggleFormBtn.innerHTML = '<span style="font-size: 1.2em; font-weight: 900; margin-right: 4px;">+</span> เพิ่ม Prompt ใหม่';
                    toggleFormBtn.style.backgroundColor = 'var(--primary-color)';
                }, 1500);
            } else {
                throw new Error(result.message || 'บันทึกไม่สำเร็จ');
            }
        } catch (error) {
            console.error('Error:', error);
            statusMsg.textContent = 'เกิดข้อผิดพลาด: ' + error.message;
            statusMsg.className = 'error';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'บันทึกข้อมูล';
            setTimeout(() => { statusMsg.textContent = ''; }, 5000);
        }
    });

    document.getElementById('searchBtn').addEventListener('click', () => {
        const filterVal = document.getElementById('filterType').value;
        fetchPrompts(filterVal);
    });

    // เพิ่มการดึงข้อมูลอัตโนมัติเมื่อเลือกจาก Dropdown ด้วย
    document.getElementById('filterType').addEventListener('change', (e) => {
        fetchPrompts(e.target.value);
    });
});

async function fetchTypes() {
    if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') return;
    
    const filterSelect = document.getElementById('filterType');
    const currentValue = filterSelect.value;
    
    // ตั้งสถานะกำลังโหลด
    filterSelect.disabled = true;
    filterSelect.innerHTML = '<option value="all">⏳ กำลังโหลดหมวดหมู่...</option>';
    filterSelect.classList.add('loading-pulse');

    try {
        const response = await fetch(`${SCRIPT_URL}?action=getTypes`);
        const result = await response.json();
        if (result.status === 'success') {
            filterSelect.innerHTML = '<option value="all">ทั้งหมด (All)</option>';
            result.data.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type;
                filterSelect.appendChild(option);
            });
            if (result.data.includes(currentValue)) {
                filterSelect.value = currentValue;
            }
        } else {
             filterSelect.innerHTML = '<option value="all">โหลดข้อมูลไม่สำเร็จ</option>';
        }
    } catch (error) {
        console.error('Fetch types error:', error);
        filterSelect.innerHTML = '<option value="all">เกิดข้อผิดพลาด</option>';
    } finally {
        // ยกเลิกสถานะกำลังโหลด
        filterSelect.disabled = false;
        filterSelect.classList.remove('loading-pulse');
    }
}

async function fetchPrompts(filterValue = 'all') {
    if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
        const container = document.getElementById('promptsContainer');
        container.innerHTML = '<p class="error" style="color:var(--primary-color);">กรุณาตั้งค่า SCRIPT_URL ในไฟล์ script.js ก่อน เพื่อเชื่อมต่อ Google Sheet</p>';
        return;
    }

    const loader = document.getElementById('loader');
    const container = document.getElementById('promptsContainer');

    loader.style.display = 'block';
    container.innerHTML = '';

    try {
        const response = await fetch(`${SCRIPT_URL}?action=getPrompts&type=${encodeURIComponent(filterValue)}`);
        const result = await response.json();

        if (result.status === 'success') {
            currentPrompts = result.data;
            renderPrompts(currentPrompts);
        } else {
            container.innerHTML = '<p class="error">ไม่สามารถดึงข้อมูลได้</p>';
        }
    } catch (error) {
        console.error('Fetch error:', error);
        container.innerHTML = '<p class="error">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>';
    } finally {
        loader.style.display = 'none';
    }
}

function renderPrompts(dataArray) {
    const container = document.getElementById('promptsContainer');
    container.innerHTML = '';

    if (!dataArray || dataArray.length === 0) {
        container.innerHTML = '<p>ไม่พบข้อมูล Prompt</p>';
        return;
    }

    dataArray.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'prompt-card';
        card.style.animationDelay = `${index * 0.05}s`;

        const typeBadge = document.createElement('span');
        typeBadge.className = 'p-type';
        typeBadge.textContent = item.type || 'General';

        const useForTitle = document.createElement('h3');
        useForTitle.className = 'p-usefor';
        useForTitle.textContent = item.usefor || 'ไม่ระบุ';

        const promptText = document.createElement('div');
        promptText.className = 'p-prompt';
        promptText.textContent = item.prompt || '';

        const noteText = document.createElement('p');
        noteText.className = 'p-note';
        noteText.textContent = item.note ? `Note: ${item.note}` : '';

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = '📋 Copy Prompt';
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(item.prompt).then(() => {
                copyBtn.textContent = '✅ Copied!';
                setTimeout(() => { copyBtn.textContent = '📋 Copy Prompt'; }, 2000);
            });
        };

        card.appendChild(typeBadge);
        card.appendChild(useForTitle);
        card.appendChild(promptText);
        if (item.note) card.appendChild(noteText);
        card.appendChild(copyBtn);

        container.appendChild(card);
    });
}
