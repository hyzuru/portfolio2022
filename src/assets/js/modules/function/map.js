export function map() {
  if (document.getElementById("map") !== null) {
    let map;
    let marker = [];
    const markerTrigger = document.querySelectorAll(".js-marker-trigger");
    const mediaQuery = window.matchMedia("(min-width: 48em)");
    const tabPanel = [...document.querySelectorAll(".js-tab-panel")];

    const icon = {
      url: "https://gigaplus.makeshop.jp/GreenMeat/assets/images/icon_marker.png",
      scaledSize: new google.maps.Size(28, 41)
    }

    const data = [
      {
        name: "すべて",
        lat: 0,
        lng: 0
      },
      {
        name: "味坊",
        lat: 35.6934758,
        lng: 139.7696939
      },
      {
        name: "羊香味坊",
        lat: 35.7056018,
        lng: 139.7714758
      },
      {
        name: "CAFE Stylo",
        lat: 35.6729467,
        lng: 139.7652708
      },
      {
        name: "AIN SOPH. Journey",
        lat: 35.690688,
        lng: 139.7044853
      },
      {
        name: "planmeet",
        lat: 0,
        lng: 0
      },
      {
        name: "パレスホテル東京グランドキッチン",
        lat: 35.6845001,
        lng: 139.7590324
      },
      {
        name: "AIN SOPH. 銀座店",
        lat: 35.6702056,
        lng: 139.7657498
      },
      {
        name: "BRIBON",
        lat: 35.7222884,
        lng: 139.7048535
      },
      {
        name: "目白 文蔵",
        lat: 35.7234449,
        lng: 139.7074135
      },
      {
        name: "人形町今半 水天宮駅前店",
        lat: 35.68422403589114,
        lng: 139.7839316725731
      },
      {
        name: "渋谷東急REIホテル",
        lat: 35.66022523233203,
        lng: 139.7019875049591
      },
      {
        name: "ハイランドリゾート ホテル＆スパ",
        lat: 35.4847242330838,
        lng: 138.77814888954163
      },
      {
        name: "LONGING HOUSE 軽井沢",
        lat: 36.3452275,
        lng: 138.6147903
      },
      {
        name: "OBBLIGATO Mexican Food",
        lat: 26.3663416,
        lng: 127.7456001
      },
      {
        name: "ESPARZA'S TACOS & COFFEE",
        lat: 26.3215963,
        lng: 127.7571855
      },
      {
        name: "ベジタルサンドイッチ",
        lat: 26.2483007,
        lng: 127.6971344
      },
      {
        name: "ハナホウ 読谷村店",
        lat: 26.4222905,
        lng: 127.7283274
      },
      {
        name: "ハナホウ 嘉手納店",
        lat: 26.3637266,
        lng: 127.7522679
      },
      {
        name: "Players Cafe",
        lat: 26.338754,
        lng: 127.7970709
      },
      {
        name: "KOKOPELLI PIZZA",
        lat: 26.4164938,
        lng: 127.7298107
      },
      {
        name: "山ねこ料理店",
        lat: 26.7452265,
        lng: 128.1752767
      },
      {
        name: "Stripe Noodles",
        lat: 26.3190887,
        lng: 127.757877
      },
      {
        name: "Cafe&Bar GAJIMARU",
        lat: 26.4392775,
        lng: 127.768762
      },
      {
        name: "暖暮 那覇牧志店",
        lat: 26.21788163741979,
        lng: 127.68732458353043
      },
      {
        name: "暖暮 沖縄美原店",
        lat: 26.348402265808783,
        lng: 127.81837999820709
      },
      {
        name: "暖暮 名護店",
        lat: 26.582317135549896,
        lng: 127.98462063074112
      },
      {
        name: "麺神 まるよし",
        lat: 26.31612168245594,
        lng: 127.75636035739035
      },
      {
        name: "レクー沖縄スパ&リゾート",
        lat: 26.317497983191274,
        lng: 127.75494575500488
      },
      {
        name: "カフー リゾート フチャク コンド・ホテル",
        lat: 26.456588058969498,
        lng: 127.81176466494799
      }
    ];

    const initMap = () => {
      const options = {
        center: { lat: 31, lng: 135 },
        zoom: 5.4,
        disableDefaultUI: true,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: true
      }

      map = new google.maps.Map(document.getElementById("map"), options);
    }

    const setMarker = (index) => {
      map.setZoom(20);
      map.setCenter({ lat: data[index].lat, lng: data[index].lng });
    }

    const onMapClick = () => {
      for (let i = 0; i < data.length; i++) {
        marker[i] = new google.maps.Marker({
          position: { lat: data[i]["lat"], lng: data[i]["lng"] },
          map: map,
          icon: icon,
          label: {
            text: data[i]["name"],
            fontSize: "0",
          },
        });

        marker[i].addListener("click", () => {
          // 初期化
          for (let i = 0; i < tabPanel.length; i++) {
            tabPanel[i].setAttribute("aria-hidden", "true");
          }

          // 該当の店舗情報を表示する
          tabPanel[i].setAttribute("aria-hidden", "false");

          // 該当の店舗位置をセンターに拡大する
          setMarker(i);
        });
      }
    }

    const onStoreClick = () => {
      for (let i = 0; i < data.length; i++) {
        markerTrigger[i].addEventListener("click", () => {
          // 初期化
          for (let i = 0; i < markerTrigger.length; i++) {
            markerTrigger[i].setAttribute("aria-expanded", "false");
            tabPanel[i].setAttribute("aria-hidden", "true");
          }

          // 該当の店舗名を選択状態にする
          markerTrigger[i].setAttribute("aria-expanded", "true");

          // 該当の店舗情報を表示する
          tabPanel[i].setAttribute("aria-hidden", "false");

          // クリックした店舗名が「planmeet」以外の時は処理を実行する
          if (markerTrigger[i].getAttribute("aria-controls") !== "store-05") {
            // 該当の店舗位置をセンターに拡大する
            setMarker(i);
          }

          if (markerTrigger[i].getAttribute("aria-controls") === "all") {
            // クリックした店舗名が「すべて」の時はセンター位置と拡大率を変える
            map.setZoom(5.4);
            map.setCenter({ lat: 31, lng: 135 })
          }
        });
      }
    }

    const handleDeviceChange = (e) => {
      if (e.matches) {
        for (let i = 0; i < data.length; i++) {
          markerTrigger[i].addEventListener("click", onStoreClick);
        }
      } else {
        for (let i = 0; i < data.length; i++) {
          markerTrigger[i].removeEventListener("click", onStoreClick);
        }
      }
    }

    initMap();
    onMapClick();
    onStoreClick();
    mediaQuery.addEventListener("change", handleDeviceChange);
    handleDeviceChange(mediaQuery);
  }
}