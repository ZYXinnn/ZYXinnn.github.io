function fetchUserInfo() {
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            const country = data.country_name;

            // 如果是中国，调用 ipinfo.io API 获取详细信息
            if (country === 'China') {
                fetch(`https://ipinfo.io/${ip}/json`)
                    .then(response => response.json())
                    .then(ipinfoData => {
                        const province = ipinfoData.region; // 省份
                        const city = ipinfoData.city; // 城市

                        // 动态生成 HTML 内容
                        const htmlContent = `
                            <p style="font-size: 24px; font-weight: bold; margin: 5px 0;"><i class="fa fa-mobile"></i> 来访者 欢迎您！</p>
                            您的IP地址是: ${ip}<br>
                            您所在的省份是: ${province}<br>
                            您所在的城市是: ${city}
                        `;

                        // 插入到页面
                        const targetElement = document.querySelector('.userip');
                        if (targetElement) {
                            targetElement.innerHTML = htmlContent;
                        } else {
                            console.error('未找到目标元素');
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching detailed location:', error);
                    });
            } else {
                // 如果不是中国，直接显示国家
                const htmlContent = `
                    <p style="font-size: 24px; font-weight: bold; margin: 5px 0;"><i class="fa fa-mobile"></i> 来访者 欢迎您！</p>
                    您的IP地址是: ${ip}<br>
                    您所在的国家是: ${country}
                `;

                // 插入到页面
                const targetElement = document.querySelector('.userip');
                if (targetElement) {
                    targetElement.innerHTML = htmlContent;
                } else {
                    console.error('未找到目标元素');
                }
            }
        })
        .catch(error => {
            console.error('Error fetching IP and location:', error);
        });
}

// 调用函数
fetchUserInfo();
