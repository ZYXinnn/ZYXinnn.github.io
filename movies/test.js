// 获取用户信息并在页面中动态插入
function fetchUserInfo() {
    // 使用第三方API获取IP地址和国家/地区信息
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            const country = data.country_name;
            let displayCountry = country;

            // 处理港澳台地区
            if (country === 'Taiwan') {
                displayCountry = '中国台湾';
            } else if (country === 'Hong Kong') {
                displayCountry = '中国香港';
            } else if (country === 'Macau') {
                displayCountry = '中国澳门';
            }

            // 调用 ipinfo.io API 获取详细信息
            fetch(`https://ipinfo.io/${ip}/json`)
                .then(response => response.json())
                .then(ipinfoData => {
                    let region = ipinfoData.region;

                    // 如果是国内地区，使用“中国+省份”格式
                    if (country === 'China || 中国') {
                        displayCountry = '中国';
                        if (region) {
                            displayCountry += ` ${region}`;
                        }
                    }

                    // 动态生成HTML内容
                    const htmlContent = `
                        <p style="font-size: 17px; margin: 5px 0;"><i class="fa fa-mobile"></i> 来访者欢迎您！</p>
                        您的IP地址是: ${ip}<br>
                        您所在的国家/地区是: ${displayCountry}
                    `;

                    // 将内容插入到页面的 .userip 容器中
                    const targetElement = document.querySelector('.userip');
                    if (targetElement) {
                        targetElement.innerHTML = htmlContent;
                    } else {
                        console.error('未找到目标元素');
                    }
                })
                .catch(error => {
                    console.error('Error fetching detailed location:', error);
                    // 如果无法获取详细信息，显示基本信息
                    const htmlContent = `
                        <p style="font-size: 17px; margin: 5px 0;"><i class="fa fa-mobile"></i> 来访者欢迎您！</p>
                        您的IP地址是: ${ip}<br>
                        您所在的国家/地区是: ${displayCountry}
                    `;

                    const targetElement = document.querySelector('.userip');
                    if (targetElement) {
                        targetElement.innerHTML = htmlContent;
                    }
                });
        })
        .catch(error => {
            console.error('Error fetching IP and location:', error);
            const targetElement = document.querySelector('.userip');
            if (targetElement) {
                targetElement.innerHTML = '无法获取您的IP地址和位置信息。';
            }
        });
}

// 页面加载完成后调用函数
document.addEventListener('DOMContentLoaded', fetchUserInfo);

