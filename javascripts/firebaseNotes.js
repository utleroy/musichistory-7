$("#view-music").click(function() {
$("#container4-add-view").hide();
$("#container2").show();
$("#container3").show();

});



$("#add").click(function() {
	console.log("free click event");
	let newSong = {
		"name": $("#inputFieldFromHtml").val(),
		"artist": $("#inputFieldFromHtml").val(),
		"album": $("#inputFieldFromHtml").val(),
	}

  $.ajax({
    url: "https://musichistorymusic.firebaseio.com/songs.json",
    type: "POST"
    data: JSON.stringify ({"titile": "crap"})
  }).done(function() {
  	console.log("it saved");

  })
}

//////////  More Songs Deleted

$('#moreButton').click(function () {
  $.ajax({
    url: "data/newSongs.json"
  }).done(function(music2){

      let addedSongs = music2.songs
      let secondOutput = $('#secondOutput')
        for (var i = 0; i < addedSongs.length; i++) {
          let currSong2 = addedSongs[i]
          let bigString2 = `<div><p>${currSong2.name} by ${currSong2.artist} on the album ${currSong2.album} <input type="button" class="delete2" value="Delete"></input></div>`

    secondOutput.append(bigString2)
    deleteSongs2()
    }
  })
})

function deleteSongs2(){
  let deleteBtn2 = $('.delete2');
  
  deleteBtn2.click(function(e){
    e.target.closest('div').remove()
  })
}


function deleteSongs(){
  let deleteBtn = $('.delete');
  deleteBtn.click(function(e){
    e.target.closest('div').remove()
  })
}

function deleteSongs(){
  $ajax({
    url: "https://musichistorymusic.firebaseio.com/songs/${songId}.json",
    method: "DELETE"
  }).done(function() {
    getSongs(makeSongs.makeSongList);
  });
}














/////////////  More Songs Deleted