$(function () {

    //button and inputs
    var price_start = $('#price_start')
    var price_end = $('#price_end')
    var w1 = $('#w1')
    var area = $('#area')
    var w2 = $('#w2')
    var maxPeople = $('#maxPeople')
    var w3 = $('#w3')
    var adress = $('#adress')
    var w4 = $('#w4')
    var w5 = $('#w5')
    var checkbox1 = $('#checkbox1')
    var checkbox2 = $('#checkbox2')
    var checkbox3 = $('#checkbox3')
    var checkbox4 = $('#checkbox4')
    var checkbox5 = $('#checkbox5')
    var checkbox6 = $('#checkbox6')
    var checkbox7 = $('#checkbox7')
    var checkbox8 = $('#checkbox8')

    var bodyAttributeMatrix = $('#bodyAttributeMatrix')

    $('#reset').click( function(){
        $('.reset').val('')
        $('.resetCheck').prop('checked', false)
    })

    $('#submit').click(async function(){
        
        try{
            const response = await fetch("http://localhost:3000/suggestion", 
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ 
                        price_start: price_start.val(),
                        price_end: price_end.val(),
                        area: area.val(), 
                        max_people: maxPeople.val(), 
                        address: adress.val(), 
                        feature: {
                            "toilet": checkbox1.is(":checked"),
                            "furniture": checkbox2.is(":checked"),
                            "waterHeater": checkbox3.is(":checked"),
                            "conditioner": checkbox4.is(":checked"),
                            "wifi": checkbox5.is(":checked"),
                            "kitchen": checkbox6.is(":checked"),
                            "park": checkbox7.is(":checked"),
                            "seperate": checkbox8.is(":checked")
                        }, 
                        "weight": [w1.val(), w2.val(), w3.val(), w4.val(), w5.val()]
                    })
                });
            const data = await response.json()
            
            var decisionMatrix = data.decisionMatrix
            var preferenceMatrix = data.preferenceMatrix
            var rooms = data.rooms
            var phi = data.phi

            $('.resetResult').html('')

            for (var i = 0; i < decisionMatrix.length; i ++){
                var html = '<tr><td>' + (i+1) + '</td>' 
                    + '<td>' + decisionMatrix[i].price + '</td>'
                    + '<td>' + decisionMatrix[i].area + '</td>'
                    + '<td>' + decisionMatrix[i].max_people + '</td>'
                    + '<td>' + decisionMatrix[i].distance + '</td>'
                    + '<td>' + decisionMatrix[i].feature_satisfied + '</td>'
                    + '<td>' + decisionMatrix[i].electricity_price + '</td>'
                    + '<td>' + decisionMatrix[i].water_price + '</td>'
                bodyAttributeMatrix.append(html)
            }

            console.log(preferenceMatrix)

            var priceHtml = ''
            var areaHtml = ''
            var maxPeopleHtml = ''
            var distanceHtml = ''
            var featureHtml = ''

                priceHtml = priceHtml + '<tr><td></td>'
                areaHtml = areaHtml + '<tr><td></td>'
                maxPeopleHtml = maxPeopleHtml + '<tr><td></td>'
                distanceHtml = distanceHtml + '<tr><td></td>'
                featureHtml = featureHtml + '<tr><td></td>'
            for (var i = 0; i < preferenceMatrix.length; i ++){
                priceHtml = priceHtml + '<td>Phòng ' + (i+1) + '</td>'
                areaHtml = areaHtml + '<td>Phòng ' + (i+1) + '</td>'
                maxPeopleHtml = maxPeopleHtml + '<td>Phòng ' + (i+1) + '</td>'
                distanceHtml = distanceHtml + '<td>Phòng ' + (i+1) + '</td>'
                featureHtml = featureHtml + '<td>Phòng ' + (i+1) + '</td>'
            }

                priceHtml = priceHtml + '</tr>'
                areaHtml = areaHtml + '</tr>'
                maxPeopleHtml = maxPeopleHtml + '</tr>'
                distanceHtml = distanceHtml + '</tr>'
                featureHtml = featureHtml + '</tr>'
            
            for (var i = 0; i < preferenceMatrix.length; i ++){
                priceHtml = priceHtml + '<tr><td>Phòng ' + (i+1) + '</td>'
                areaHtml = areaHtml + '<tr><td>Phòng ' + (i+1) + '</td>'
                maxPeopleHtml = maxPeopleHtml + '<tr><td>Phòng ' + (i+1) + '</td>'
                distanceHtml = distanceHtml + '<tr><td>Phòng ' + (i+1) + '</td>'
                featureHtml = featureHtml + '<tr><td>Phòng ' + (i+1) + '</td>'
                for (var j = 0;j < preferenceMatrix.length; j++){
                    priceHtml = priceHtml + '<td>' + preferenceMatrix[i][j].price + '</td>'
                    areaHtml = areaHtml + '<td>' + preferenceMatrix[i][j].area + '</td>'
                    maxPeopleHtml = maxPeopleHtml + '<td>' + preferenceMatrix[i][j].max_people + '</td>'
                    distanceHtml = distanceHtml + '<td>' + preferenceMatrix[i][j].distance + '</td>'
                    featureHtml = featureHtml + '<td>' + preferenceMatrix[i][j].feature_satisfied + '</td>'
                }
                priceHtml = priceHtml + '</tr>'
                areaHtml = areaHtml + '</tr>'
                maxPeopleHtml = maxPeopleHtml + '</tr>'
                distanceHtml = distanceHtml + '</tr>'
                featureHtml = featureHtml + '</tr>'
            }

            $('#table1').append(priceHtml)
            $('#table2').append(areaHtml)
            $('#table3').append(maxPeopleHtml)
            $('#table4').append(distanceHtml)
            $('#table5').append(featureHtml)
            $('#table6').append(areaHtml)
            $('#table7').append(areaHtml)

            var names = [phi.phiPlus.length]
            for (var i = 0; i < phi.phiPlus.length; i++){
                names[i] = 'Phòng ' + (i+1)
            }

            new Chart($('#myChart'), {
                type: 'bar',
                data: {
                  labels: names,
                  datasets: [
                    {
                        label: 'Dòng hơn cấp Dương',
                        data: phi.phiPlus,
                        borderWidth: 1
                    }, 
                    {
                        label: 'Dòng hơn cấp âm',
                        data: phi.phiMinus,
                        borderWidth: 1
                    }, 
                    {
                        label: 'Dòng hơn cấp chung',
                        data: phi.netPhi,
                        borderWidth: 1
                    }]
                },
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }
              });

            var t0 = '<tr><td></td>'
            var t1 = '<tr><td>Dòng hơn cấp dương</td>'
            var t2 = '<tr><td>Dòng hơn cấp âm</td>'
            var t3 = '<tr><td>Dòng hơn cấp chung</td>'

            for (var i = 0; i < phi.phiPlus.length; i++){
                t0 = t0 + '<td>Phòng ' + (i+1) + '</td>'
                t1 = t1 + '<td>' + phi.phiPlus[i] + '</td>'
                t2 = t2 + '<td>' + phi.phiMinus[i] + '</td>'
                t3 = t3 + '<td>' + phi.netPhi[i] + '</td>'
            }

            $('#table9').append(t0 + '</tr>' + t1 + '</tr>' + t2 + '</tr>' + t3 + '</tr>')

            for (var i = 0; i < rooms.length; i ++) {
                var room = rooms[i]
                var TienIch = '' 
                    + room.toilet ? 'Vệ sinh khép kín ' : ''
                    + room.furniture ? 'Nội thất đầy đủ ' : ''
                    + room.waterHeater ? 'Bình nóng lạnh ' : ''
                    + room.wifi ? 'Wifi ' : ''
                    + room.kitchen ? 'Chỗ nấu ăn ' : ''
                    + room.park ? 'Chỗ để xe ' : ''
                    + room.seperate ? 'Không chung chủ ' : ''
                    + room.conditioner ? 'Điều hòa ' : ''

                htmlRoom = '<div class="row m-0 border border-5 rounded mb-2"><img src="' + room.images + '" style="width: 70%;overflow: hidden;" class="object-fit-cover p-0"><div style="width: 30%;" class="p-3">' 
                    + 'ID phòng: ' + room.room_id + '<br>'
                    + 'Diện tích: ' + room.area + '<br>'
                    + 'Số người ở tối đa: ' + room.max_people + '<br>'
                    + 'Địa chỉ: ' + room.detail_address + ', ' + room.street + ', ' + room.ward + ', ' + room.district + ', ' + room.city + ', ' + '<br>'
                    + 'Giá thuê: ' + room.price + 'đ<br>'
                    + 'Giá điện: ' + room.electricity_price + 'đ/kmh<br>'
                    + 'Giá nước: ' + room.water_price + 'đ/m3<br>'
                    + 'Tiện ích: ' + TienIch
                    + '</div></div>'
                $('#room').append(htmlRoom) 
            }

            $('#solution').css('display','block');

        } catch (error) {
            console.log(error)
        }
    })
});
