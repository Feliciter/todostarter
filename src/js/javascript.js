var elSearchInput = document.getElementById("myInput");

if (typeof elSearchInput.addEventListener != "undefined") {
  elSearchInput.addEventListener(
    "keyup",
    function(evt) {
      searchFunction();
    },
    false
  );
} else if (typeof elSearchInput.attachEvent != "undefined") {
  elSearchInput.attachEvent("onkeyup", function(evt) {
    searchFunction();
  });
}

function searchFunction() {
  var input, filter, wrap, t, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();

  wrap = document.getElementById("wrap");
  card = wrap.getElementsByClassName("column");

  for (i = 0; i < card.length; i++) {
    t = card[i].getElementsByTagName("H3")[0];
    txtValue = t.textContent || t.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      card[i].style.display = "";
    } else {
      card[i].style.display = "none";
    }
  }
}

statusForm.statusSelect.onchange = function() {
  var wrap, card;

  filter = this.value;

  wrap = document.getElementById("wrap");
  card = wrap.getElementsByClassName("column");

  if (filter === "all") {
    for (i = 0; i < card.length; i++) {
      t = card[i].getElementsByTagName("H4")[0];
      card[i].style.display = "";
    }
  } else
    for (i = 0; i < card.length; i++) {
      t = card[i].getElementsByTagName("H4")[0];

      txtValue = t.textContent || t.innerText;

      if (txtValue.indexOf(filter) == 0) {
        card[i].style.display = "";
      } else {
        card[i].style.display = "none";
      }
    }
};

priorForm.priorSelect.onchange = function() {
  var wrap, card;

  filter = this.value;

  wrap = document.getElementById("wrap");
  card = wrap.getElementsByClassName("column");

  if (filter === "all") {
    for (i = 0; i < card.length; i++) {
      t = card[i].getElementsByTagName("H5")[0];
      card[i].style.display = "";
    }
  } else
    for (i = 0; i < card.length; i++) {
      t = card[i].getElementsByTagName("H5")[0];
      txtValue = t.textContent || t.innerText;

      if (txtValue.indexOf(filter) == 0) {
        card[i].style.display = "";
      } else {
        card[i].style.display = "none";
      }
    }
};

var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementById("btnCancel");

btn.onclick = function() {
  modal.style.display = "block";
};

span.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

var elBtnSave = document.getElementById("btnSave");

elBtnSave.addEventListener("click", insertnewCard, false);

function insertnewCard() {
  var cardplace = document.getElementById("placenewcard");
  var formtitle = document.getElementById("form-title");

  var formtext = document.getElementById("form-text");
  var formsprior = document.getElementById("form-prior");

  if (formtitle.value == "") {
    alert("Title must be filled out");
    return false;
  }

  var htmltmplt = `
    <div class="column">
          <div class="card">
            <h3>${formtitle.value}</h3>
            <p>${formtext.value}</p>
            <div>            
              <div class="priorcard" > 
                <H5>${formsprior.value}</H5>
                <H4 class="hidestatus">open</H4>
              </div> 
  
                <div class="dropdown" >
                  <button class="dropbtn" >...</button>
                  <div class="dropdown-content">
                     <a href="#">done</a>
                    <a href="#">edit</a>
                   <a href="#">delete</a>
                    </div>  
                </div>
              </div>  
          </div>
        </div>
    
    `;

  cardplace.insertAdjacentHTML("afterbegin", htmltmplt);
}

var dropbtn = document.getElementsByClassName("dropbtn");
var i;
for (i = 0; i < dropbtn.length; i++) {
  dropbtn[i].onmouseenter = function() {
    var div = this.parentElement;

    var listlinks = div.getElementsByClassName("dropdown-content");

    var linkas = listlinks[0].getElementsByTagName("a");
    var div = linkas[0];
    var divcsard = div.closest(".card");

    var t_status = divcsard.getElementsByTagName("H4")[0];
    var t_statusValue = t_status.textContent || t_status.innerText;

    var t_title = divcsard.getElementsByTagName("H3")[0];

    var t_text = divcsard.getElementsByTagName("p")[0];

    var t_prior = divcsard.getElementsByTagName("H5")[0];

    linkas[0].onclick = function() {
      {
        t_status.innerHTML = "done";
      }
    };

    linkas[1].onclick = function() {
      {
        elBtnSave.removeEventListener("click", insertnewCard, false);

        var elBtnSave_edit = document.getElementById("btnSave");

        var formtitle = document.getElementById("form-title");
        formtitle.value = t_title.textContent;

        var formtext = document.getElementById("form-text");
        formtext.innerText = t_text.textContent;

        var formsprior = document.getElementById("form-prior");

        modal.style.display = "block";

        elBtnSave_edit.addEventListener("click", updateCard, false);

        function updateCard() {
          t_title.textContent = formtitle.value;

          t_text.textContent = formtext.value;

          t_prior.textContent =
            formsprior.options[formsprior.selectedIndex].text;

          modal.style.display = "none";

          elBtnSave_edit.removeEventListener("click", updateCard, false);

          elBtnSave.addEventListener("click", insertnewCard, false);
        }
      }
    };

    linkas[2].onclick = function() {
      {
        div.parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
          "none";
      }
    };
  };
}

function cardEdit() {
  var modal = document.getElementById("myModal");

  var btn = document.getElementById("myBtn");

  var span = document.getElementById("btnCancel");

  btn.onclick = function() {
    modal.style.display = "block";
  };

  span.onclick = function() {
    modal.style.display = "none";
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
