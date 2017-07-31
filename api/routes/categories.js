// \'Wine\',\'Wireless\',\'ArtsAndCrafts\',\'Miscellaneous\',\'Electronics\',\'Jewelry\',\'MobileApps\',\'Photo\',\'Shoes\',\'KindleStore\',\'Automotive\',\'Vehicles\',\'Pantry\',
// \'MusicalInstruments\',\'DigitalMusic\',\'GiftCards\',\'FashionBaby\',\'FashionGirls\',\'GourmetFood\',\'HomeGarden\',\'MusicTracks\',\'UnboxVideo\',\'FashionWomen\',\'VideoGames\',\'FashionMen\',
// \'Kitchen\',\'Video\',\'Software\',\'Beauty\',\'Grocery\',,\'FashionBoys\',\'Industrial\',\'PetSupplies\',\'OfficeProducts\',\'Magazines\',\'Watches\',\'Luggage\',\'OutdoorLiving\',\'Toys\',\
// 'SportingGoods\',\'PCHardware\',\'Movies\',\'Books\',\'Collectibles\',\'Handmade\',\'VHS\',\'MP3Downloads\',
// \'Fashion\',\'Tools\',\'Baby\',\'Apparel\',\'Marketplace\',\'DVD\',\'Appliances\',\'Music\',\'LawnAndGarden\',\'WirelessAccessories\',\'Blended\',\'HealthPersonalCare\',\'Classical\



var categories = {

	Books:['51546011', '16266351', '16266361', '16266381', '16266391', '16266401', '16266411', '16266421', '16266431', '16266441', '16266461', '16266471', '16266481', '16266491', '16266501', '16266511', '16266521', '16266531', '16266551', '16266541', '16266561'],
	Movies: ['2649512011', '2649513011'],
	Music: ['465672', '4650230011', '468040', '359372011', '714574', '13650871', '301756', '116860011', '30', '31', '265640', '173425', '173429', '67204', '85', '16', '7', '32', '2231705011', '67207', '34', '35', '36', '37', '39', '40', '42', '33', '289122', '302125', '602072', '602074', '468304', '5196', '468300', '602076', '468308', '13463651', '5234', '5238', '470998', '5240', '301405011', '299603011', '13463691', '225371', '300067011', '5255', '510676', '67178', '510678', '513060', '162409011', '2231704011', '468418', '2231701011', '67220', '67222', '408256', '5260', '36712', '84', '63654', '63681', '63690', '63700', '63699', '63701', '2231706011', '67208', '468414', '468416', '63893', '63894', '63930', '500060', '63897', '63927', '598152', '500060', '554380011', '301415011', '554373011', '554375011', '67180', '67183', '67185', '470506'],
	Tools: ['13397451', '251266011', '328182011', '511228'],
	Toys: ['236509011', '1273021011', '2237944011', '2309681011', '276201011', '723486011', '2899443011', '293107011', '236510011', '347076011', '268626011', '276221011', '333907011'],
	Kitchen: ['2619525011', '1057794', '1063288', '510080'],
	Baby: ['165797011', '166736011', '166835011', '166764011', '166777011', '166828011', '239226011', '695338011', '166804011', '166863011'],
	Electronics: ['172532', '3224438011', '11042251', '172546', '172540', '2252931011', '173243', '172664', '3224462011', '173541', '172526'],
	VideoGames: ['229647', '229575', '6427814011', '14220161', '6469269011'],
	Beauty: ['51570011', '11055981', '11055991', '11062741', '11059581', '11058281', '11060451']

}

var randBook = categories.Books[Math.floor(Math.random()*categories.Books.length)];
var randMovie = categories.Movies[Math.floor(Math.random()*categories.Movies.length)];
var randMusic = categories.Music[Math.floor(Math.random()*categories.Music.length)];
var randTools = categories.Tools[Math.floor(Math.random()*categories.Tools.length)];
var randToys = categories.Toys[Math.floor(Math.random()*categories.Toys.length)];
var randKitchen = categories.Kitchen[Math.floor(Math.random()*categories.Kitchen.length)];
var randBaby = categories.Baby[Math.floor(Math.random()*categories.Baby.length)];
var randElectronics = categories.Electronics[Math.floor(Math.random()*categories.Electronics.length)];
var randVideoGames = categories.VideoGames[Math.floor(Math.random()*categories.VideoGames.length)];
var randBeauty = categories.Beauty[Math.floor(Math.random()*categories.Beauty.length)];

// console.log(randBook)
// console.log(randMovie)
// console.log(randMusic)
// console.log(randTools)
// console.log(randToys)
// console.log(randKitchen)
// console.log(randBaby)
// console.log(randElectronics)
// console.log(randVideoGames)
// console.log(randBeauty)

var category = categories.Books //this variable will be equal to the category that the wheel lands on
function getRand(){
	if (category){
		return randBook;
	}else{
		return undefined;
	}

}

console.log(getRand())


