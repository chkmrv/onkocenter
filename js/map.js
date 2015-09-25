
		var objects = {
			o1: {
				coords: [51.6815731,39.2834455],
				title: 'Онкоцентр'
			}
		};

		$(function () {


		var myMap = new google.maps.Map($('#map_canvas').get(0), {

				center:  new google.maps.LatLng(51.6815731,39.2834455),
				zoom: 16,
				scrollwheel: false,
				icon: 'img/marker-red-small.png',
				styles: [
			    {
			        "featureType": "landscape",
			        "stylers": [
			            {
			                "saturation": -100
			            },
			            {
			                "lightness": 65
			            },
			            {
			                "visibility": "on"
			            }
			        ]
			    },
			    {
			        "featureType": "poi",
			        "stylers": [
			            {
			                "saturation": -100
			            },
			            {
			                "lightness": 51
			            },
			            {
			                "visibility": "simplified"
			            }
			        ]
			    },
			    {
			        "featureType": "road.highway",
			        "stylers": [
			            {
			                "saturation": -100
			            },
			            {
			                "visibility": "simplified"
			            }
			        ]
			    },
			    {
			        "featureType": "road.arterial",
			        "stylers": [
			            {
			                "saturation": -100
			            },
			            {
			                "lightness": 30
			            },
			            {
			                "visibility": "on"
			            }
			        ]
			    },
			    {
			        "featureType": "road.local",
			        "stylers": [
			            {
			                "saturation": -100
			            },
			            {
			                "lightness": 40
			            },
			            {
			                "visibility": "on"
			            }
			        ]
			    },
			    {
			        "featureType": "transit",
			        "stylers": [
			            {
			                "saturation": -100
			            },
			            {
			                "visibility": "simplified"
			            }
			        ]
			    },
			    {
			        "featureType": "administrative.province",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "labels",
			        "stylers": [
			            {
			                "visibility": "on"
			            },
			            {
			                "lightness": -25
			            },
			            {
			                "saturation": -100
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "hue": "#ffff00"
			            },
			            {
			                "lightness": -25
			            },
			            {
			                "saturation": -97
			            }
			        ]
			    }
			]
			}),
			$list = $('#testList'),
			list = {},
			balloon = new google.maps.InfoWindow();

			for (var i in objects) {
				var title = objects[i].title,
					description = '<p style="color:#000; font-size:18px; font-weight:bold; margin: 0;">' + title + '</p>';

				list[i] = $('<li>', {
						'class': 'item active'
					})
					.data('marker', new google.maps.Marker({
						position: new google.maps.LatLng(
							objects[i].coords[0],
							objects[i].coords[1]
						),
						icon: 'img/marker-red-small.png',
						title: title,
						id: i
					}))
					.data('description', description)
					.data('balloon', new google.maps.InfoWindow({
						content: description
					}))
					.on('click', function () {
						var $item = $(this);

						if ($item.hasClass('active')) {
							$item.data('marker').setMap(null);
							$item.removeClass('active');
						} else {
							$item.data('marker').setMap(myMap);
							$item.addClass('active');
						}
					})
					.prependTo($list);

				list[i].data('marker').setMap(myMap);
				google.maps.event.addListener(list[i].data('marker'), 'click', function () {
					var $item = list[this.id];
					// $('.place-slider .slide').hide();
					// $('.place-slider .slide').append('<span>номер -  '+ this.id  +'</span>');
					
					balloon.setContent($item.data('description'));
					balloon.open(myMap, $item.data('marker'));

				  	myMap.setCenter(list[i].data('marker').getPosition());
				  	myMap.setZoom(13);
				});
			}
		});