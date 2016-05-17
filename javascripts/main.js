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
  
//************ hides list view and shows add view on click **********//
  $("#add-music-view").click(function() {
    $(".col-xs-4").hide("slow");
    $(".row").hide("slow");
    $(".col-xs-4").show("slow");
    })

  //********** hides add view and shows list view on click **********//
  $("#list-music-view").click(function() {
    $(".row").hide("slow");
    $(".col-xs-4").hide("slow");
    $(".row").show("slow");
  })

  //*********** adds music per user input on click of submit button ************//
  $("#addNew").click(function() {
    let newSong = {
      "name": $("#user-song").val(),
      "artist": $("#user-artist").val(),
      "album": $("#user-album").val(),
    }
  //************ ajax call to add music from user submit to firebase ************//
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

