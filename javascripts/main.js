"use strict"

$(document).ready(function(){

  let listView = $('#list-view');
  let songs = [];
  let songs2 = [];

  function songsDisplayAjax () {
    $.ajax({
      url: "https://musichistorymusic.firebaseio.com/songs.json",  
    }).done(function (music){
      for (let song in music) {
        let currentSong = music[song]
        let songString = `<div><h3>${currentSong.name}</h3>
        ${currentSong.artist} 
        ${currentSong.album}<br><input id=${song} type="button" class="delete" value="Delete"></input>
        <input data-edit-id=${song} type="button" class="edit" value="Edit"></input>
        </div>`
        listView.append(songString)
      }
    })
  }
  songsDisplayAjax();

  $("#list-view").on("click", ".delete", ".edit", function(){
    deleteAjax($(".delete").attr("id"))
  })

  function deleteAjax (cow) {
    $.ajax({
      url: "https://musichistorymusic.firebaseio.com/songs/" + cow + ".json",
      type: "DELETE"
    }).done(function() {
      $("#list-view").children().remove();
      songsDisplayAjax();

    })
  }

  // function editAjax () {
  //   $.ajax({
  //     url: "https://musichistorymusic.firebaseio.com/songs/.json",
  //     type: "PUT"
  //   }).done(function() {
  //     $("#list-view")
  //     songsDisplayAjax();
  //   })
  

  $("#add-music-view").click(function() {
    $(".col-xs-4").hide("slow");
    $(".row").hide("slow");
    $(".col-xs-4").show("slow");
    })
  $("#list-music-view").click(function() {
    $(".row").hide("slow");
    $(".col-xs-4").hide("slow");
    $(".row").show("slow");
  })


  $("#addNew").click(function() {
    let newSong = {
      "name": $("#user-song").val(),
      "artist": $("#user-artist").val(),
      "album": $("#user-album").val(),
    }

    $.ajax({
      url: "https://musichistorymusic.firebaseio.com/songs.json",
      type: "POST",
      data: JSON.stringify (newSong)
    }).done(function(stuffFromPost) {
      $("#list-view").children().remove();
      songsDisplayAjax();

    })
  });
});

