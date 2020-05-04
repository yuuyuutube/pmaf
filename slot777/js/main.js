        // fancy example
        $('.fancy .slot').jSlots({
            number : 3,
            winnerNumber : 7,
            spinner : '#playFancy',
            easing : 'easeOutSine',
            time : 6000,
            loops : 3,
            onStart : function() {
                $('.slot').removeClass('winner');
            },
            onWin : function(winCount, winners) {
                // only fires if you win
                
                $.each(winners, function() {
                    this.addClass('winner');
                });

                // react to the # of winning slots                 
                if ( winCount === 1 ) {
                    //alert('You got ' + winCount + ' 7!!!');
                } else if ( winCount > 1 ) {
                    //alert('You got ' + winCount + ' 7’s!!!');
                }
                
            }
        });