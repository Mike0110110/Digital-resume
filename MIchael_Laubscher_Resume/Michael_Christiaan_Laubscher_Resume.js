$(document).ready(function () {

    $('#profile_ripple').ripples({
        resolution: 512,
        dropRadius: 10
    });

    const bars = document.querySelectorAll('.progress_bar');
    bars.forEach(function (bar) {
        let percentage = bar.dataset.percent;
        let tooltip = bar.children[0];
        tooltip.innText = percentage + '%';
        bar.style.width = percentage + '%';
        console.log(percentage);
    })

    //image filter

    var $wrapper = $('.portfolio_wrapper');

    //Initialise iostope

    $wrapper.isotope({
        filter: '*',
        layoutMode: 'masonry',  
        animationOptions: {
        duration: 750, 
        easing: 'linear'
        }
    });

    let links = document.querySelectorAll('.tabs a');

    links.forEach(link => {

        let selector = link.dataset.filter;

        link.addEventListener('click', function (e) {
            e.preventDefault();

            $wrapper.isotope({
                filter: selector,
                layoutMode: 'masonry',
                animationOptions: {
                    duration: 750,
                    easing: 'linear'
                }
            });

            links.forEach(link => {
                link.classList.remove('active');
            })
            e.target.classList.add('active');

        });
    })

    //magnify pop up

    $('.magnify').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        zoom: {
            enable: true
        }
    })

    //Slider 
    $('.slider').slick({
        arrows: false,
        autoplay: true
    });

});


window.addEventListener("DOMContentLoaded", function() {

    // get the form elements defined in your form HTML above
    
    var form = document.getElementById("my-form");
    var status = document.querySelector("#status");

    // Success and Error functions for after the form is submitted
    
    function success() {
      form.reset();
      status.classList.add('success');
      status.innerHTML = "Successfully Send!";
    }

    function error() {
        status.classList.add('error');
      status.innerHTML = "Oops! There was a problem.";
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    }); 
  });
  
  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }