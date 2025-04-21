// 填充表单字段
chrome.storage.local.get('data', ({ data }) => {
    console.log("data length:",data.length);
    clickButton(data.length-3);
    if (data.length > 1) {
        // const [id, name, price] = data[2];
        // console.log(id, name, price);
        // document.querySelector('input[name="pl_sid_2"]').value = id;
        // document.querySelector('input[name="pname_2_1"]').value = name;
        // document.querySelector('input[name="pvalue_2_1"]').value = price;
        data.forEach((row, index) => {
            if (index > 0 && index < data.length-1) { // Skip the first row if it contains headers
                let [id, name, price] = row;
                id_1 = id.slice(1); 
                console.log(id_1, name, price);
                document.querySelector(`input[name="pl_sid_${index}"]`).value = id_1;
                document.querySelector(`input[name="pname_${index}_1"]`).value = name;
                document.querySelector(`input[name="pvalue_${index}_1"]`).value = price;
            }
        });
    } else {
        console.log('No data available');
    }
    
  });
  
  
// 自动点击按钮
const clickButton = (times) => {
    // const buttons = document.querySelectorAll('button[type="button"]');
    // let buttons = document.getElementsByTagName("input"); // Get all input elements
    let button = document.evaluate(
        '//input[@type="button" and @onclick="add_plrows()"]',
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue;
       
    
    for (let i = 0; i < times; i++) {
        
            if (button) {
                button.click();
                console.log('Button clicked successfully!');
            } else {
                console.log('Button not found!');
            }
        
    }
};
  
// 确保页面加载完成后执行
// if (document.readyState === 'complete') {
//     clickButton(5);
//     console.log('Page already loaded! Button clicked successfully!');
// } 
// else {
//     window.addEventListener('load', clickButton(3));
//     console.log('Waiting for page to load...');
// }
  