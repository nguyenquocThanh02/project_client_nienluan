export const isJsonString = (data) => {
    try{
        JSON.parse(data)
    }catch(error){
        return false;
    }
    return true;
}

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const convertMoney = (price) => {
    try {
        // return price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        const roundedPrice = parseInt(price)
        return  roundedPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    } catch (error) {
        return null
    }
}

