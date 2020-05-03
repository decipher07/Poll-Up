const form = document.getElementById('vote-form');

// Form Submit Event
form.addEventListener('submit', async (e) => {
    const choice = document.querySelector('input[name=os]:checked').value ;

    const data = {os: choice};

    fetch('http://localhost:3000/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
     .then(res => res.json())
     .then(data => console.log(data))
     .catch(err => console.log(err))

    e.preventDefault();
});

let dataPoints = [
    {label: 'Ubuntu', y: 0},
    {label: 'Mint', y: 0},
    {label: 'Manjaro', y: 0},
    {label: 'Kali', y: 0},
    {label: 'Other', y: 0}
];

const chartContainer = document.querySelector('#chartContainer');

if (chartContainer){
    const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: 'Distro Results'
        },
        data :[
            {
                type : 'column',
                dataPoints: dataPoints
            }
        ]
    });
    chart.render(); 
    
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('7b2208005f69a9cba185', {
          cluster: 'ap2'
    });
    
    var channel = pusher.subscribe('os-poll');
    channel.bind('os-event', function(data) {
          dataPoints = dataPoints.map( x => {
              if (x.label == data.os){
                  x.y += data.points;
                  return x ;
              } 
              return x ;
          });

          chart.render();
    });
    
}
