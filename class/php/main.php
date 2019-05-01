<!DOCTYPE>

<html>
    <head>
        
    </head>
    <body>
        <table>
            <?php
                $rand = rand(0,10);  
                echo "<tr> <td> Random Numbers: </td> <td> $rand </td> </tr>";
                
                $total = $rand;
                for($i=0; $i<9; $i++){
                    $rand = rand(0,10);  
                    $total += $rand;
                    echo "<tr> <td>($rand % 2 == 0 ? 'even' : 'odd')</td> <td>$rand</td> </tr>";
                }
                echo "<tr> <td> Total: </td> <td> $total </td> </tr>";
            ?>
        </table>
    </body>
</html>