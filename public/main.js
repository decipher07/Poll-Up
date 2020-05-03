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

fetch('http://localhost:3000/poll')
    .then(res => res.json())
    .then(data => {
        const votes = data.votes;
        const totalVotes = votes.length ;
        
        const voteCounts = votes.reduce( (acc, vote) => ((acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc), {});

        console.log(`voteCounts are ${voteCounts}`)

let dataPoints = [
    {label: 'Ubuntu', y: voteCounts.Ubuntu},
    {label: 'Mint', y: voteCounts.Mint},
    {label: 'Manjaro', y: voteCounts.Manjaro},
    {label: 'Kali', y: voteCounts.Kali},
    {label: 'Other', y: voteCounts.Other}
];

const chartContainer = document.querySelector('#chartContainer');

if (chartContainer){
    const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: `Total Votes ${totalVotes}`
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
    });

