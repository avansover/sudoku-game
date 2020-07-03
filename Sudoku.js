document.getElementById('prepBox').style.visibility = "hidden";
var selectedDifficulty = localStorage.getItem('SelectedDifficulty');

//switch

let difficulty = selectedDifficulty

//let difficulty = 0.3

let mat2 = backTrackSudoku(difficulty)

function backTrackSudoku(difficultyForBackTrack) {

    //console.log(difficultyForBackTrack);

    if (difficultyForBackTrack < 1) {
        var arrChecker = [1, 2, 3, 4]
    } else {
        var arrChecker = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }

    //create a new object mat with cell With value and sn, form 1 to the end of the mat

    var fmat0 = []
    for (let i = 0; i < arrChecker.length; i++) {
        fmat0.push([])
        for (let j = 0; j < arrChecker.length; j++) {
            fmat0[i].push({ value: j + i * arrChecker.length + 1, sn: j + i * arrChecker.length + 1 })
        }
    }

    //better way to randomize the 0 row

    for (i = 0; i < arrChecker.length * 3; i++) {

        let rand1 = Math.floor(Math.random() * arrChecker.length)
        let rand2 = Math.floor(Math.random() * arrChecker.length)

        let num1 = fmat0[0][rand1].value
        let num2 = fmat0[0][rand2].value

        fmat0[0][rand1].value = num2
        fmat0[0][rand2].value = num1

    }

    //back tarcking for the rest of the mat

    //debugger
    for (var i = 1; i < fmat0.length; i++) {
        //debugger
        for (var j = 0; j < fmat0.length; j++) {
            //debugger
            fmat0[i][j].value = 1
            for (var kCell1to9 = 0; kCell1to9 < fmat0.length; kCell1to9++) {
                if (checkerBackTracking(fmat0, difficultyForBackTrack) == false || fmat0[i][j].value > fmat0.length) {
                    fmat0[i][j].value = fmat0[i][j].value + 1
                    if (fmat0[i][j].value > fmat0.length) {
                        fmat0[i][j].value = fmat0[i][j].sn + 1
                        if (j > 0) {
                            j--
                            kCell1to9 = 0
                            fmat0[i][j].value = fmat0[i][j].value + 1
                        } else if (i == 0 && j == 0) {
                            for (let i = 0; i < arrChecker.length * 3; i++) {

                                let rand1 = Math.floor(Math.random() * arrChecker.length)
                                let rand2 = Math.floor(Math.random() * arrChecker.length)

                                let num1 = fmat0[0][rand1].value
                                let num2 = fmat0[0][rand2].value

                                fmat0[0][rand1].value = num2
                                fmat0[0][rand2].value = num1

                            }
                        } else
                        if (j == 0 && i != 0) {
                            j = fmat0.length - 1
                            i--
                            kCell1to9 = 0
                            fmat0[i][j].value = fmat0[i][j].value + 1
                        }
                    }
                }
            }
        }
    }


    fmat00 = []
    for (let i = 0; i < fmat0.length; i++) {
        fmat00.push([])
        for (let j = 0; j < fmat0.length; j++) {
            fmat00[i].push(fmat0[i][j].value)
        }
    }

    return fmat00
}

//2. Building the sudoku according to difficulty level 

function MatToSolvedSudoku(fmat1, fdifficulty) {

    // to get easy sudoko with 1 cell, tup 19 in test
    var test = 0

    // this code will transfer the fmat1 from normal mat into an object mat.
    // it will add several "status"
    fmat2 = []
    for (let i = 0; i < fmat1.length; i++) {
        fmat2.push([])
            //here we made the lines for the sudoku grid
        var line = document.createElement("tr");
        line.id = `line${i}`;
        document.getElementById("sudokuGrid").appendChild(line);

        for (let j = 0; j < fmat1.length; j++) {
            //making the object behind the the grid on the webpage
            fmat2[i].push({ value: fmat1[i][j], status: 'revealed', legalx: 'yes', legaly: 'yes' })
                //here we made the cells for the sudoku grid and put in the valued line
            var cell = document.createElement("td");
            cell.className = "cell"
            cell.innerHTML = fmat2[i][j].value
            document.getElementById(`line${i}`).appendChild(cell);
            //here we color the blocks so we can distinguish between them
            if ((j >= 3 && j <= 5 && i <= 2 || j >= 3 && j <= 5 && i >= 6 || i >= 3 && i <= 5 && j <= 2 || i >= 3 && i <= 5 && j >= 6) && difficulty >= 1) {
                document.getElementById("sudokuGrid").rows[i].cells[j].style.backgroundColor = "rgb(225, 225, 225)"
                document.getElementById("sudokuGrid").rows[i].cells[j].style.width = "58px"
            } else if ((j >= 2 && i <= 1 || j <= 1 && i >= 2) && difficulty < 1) {
                document.getElementById("sudokuGrid").rows[i].cells[j].style.backgroundColor = "rgb(225, 225, 225)"
                document.getElementById("sudokuGrid").rows[i].cells[j].style.width = "58px"
                document.getElementById("clockDiv").style.top = "130px"
                document.getElementById("sudokuGrid").style.left = "150px"
            }
        }
    }

    //this code distribute and replace the hidden cells and place them instead of the revealed cells
    let hiddenCounter = 0
    while (hiddenCounter <= fdifficulty * 20 - 1 - test) {
        for (let i = 0; i < fmat2.length; i++) {
            for (let j = 0; j < fmat2.length; j++) {
                if (Math.random() > 0.9 && fmat2[i][j].status == 'revealed' && hiddenCounter <= fdifficulty * 20 - 1 - test) {
                    fmat2[i][j].status = 'hidden';
                    document.getElementById("sudokuGrid").rows[i].cells[j].style.borderColor = "gray"
                    document.getElementById("sudokuGrid").rows[i].cells[j].innerHTML = "";
                    var emptycell = document.createElement('input');
                    emptycell.className = "input"
                    emptycell.type = "number"
                    document.getElementById("sudokuGrid").rows[i].cells[j].appendChild(emptycell);
                    //for keeping a solid block color
                    if (difficulty >= 1) {
                        if (j >= 3 && j <= 5 && i <= 2 || j >= 3 && j <= 5 && i >= 6 || i >= 3 && i <= 5 && j <= 2 || i >= 3 && i <= 5 && j >= 6) {
                            emptycell.style.backgroundColor = "rgb(225, 225, 225)"
                        } else {
                            emptycell.style.backgroundColor = "rgb(190, 190, 190)"
                        }
                    } else if (difficulty < 1) {
                        if ((j >= 2 && i <= 1 || j <= 1 && i >= 2) && difficulty < 1) {
                            emptycell.style.backgroundColor = "rgb(225, 225, 225)"
                        } else {
                            emptycell.style.backgroundColor = "rgb(190, 190, 190)"
                        }
                    }

                    hiddenCounter++
                }
            }
        }
    }

    //console.log(hiddenCounter);
    //console.log(fmat2);

}

if (difficulty < 1) {
    MatToSolvedSudoku(mat2, difficulty);
} else {
    MatToSolvedSudoku(mat2, difficulty);
}

//3. filling the sudoku, here every keydwon will enter the value to the object

function sudokuFiller(fmat3) {

    for (let i = 0; i < fmat3.length; i++) {
        for (let j = 0; j < fmat3.length; j++) {
            if (fmat3[i][j].status == 'hidden') {
                try {
                    fmat3[i][j].value = parseInt((document.getElementById("sudokuGrid").rows[i].cells[j]).firstChild.value)
                } catch (error) {
                    console.warn("you have probably won the game");
                }
            }
        }
    }
    return fmat3;
}

//4. checking and pointing in game problem with rows, column and blocks

function sudokuSemiChecker(fmat6) {

    let arrChecker = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    //checking and pointing in game problem with rows

    for (i = 0; i < fmat6.length; i++) {

        for (var highestRowcheckcounter = 0, kArrCheckerIndex = 0; kArrCheckerIndex < arrChecker.length; kArrCheckerIndex++) {
            for (var rowcheckcounter = 0, j = 0; j < fmat6.length; j++) {
                if (arrChecker[kArrCheckerIndex] == fmat6[i][j].value) {
                    rowcheckcounter++
                }
            }
            if (rowcheckcounter > highestRowcheckcounter) {
                highestRowcheckcounter = rowcheckcounter
            }

            if (highestRowcheckcounter > 1) {
                for (j = 0; j < fmat6.length; j++) {
                    document.getElementById('sudokuGrid').rows[i].cells[j].style.borderColor = "#990000"
                    fmat6[i][j].legalx = "no"
                }
            } else {
                for (j = 0; j < fmat6.length; j++) {
                    if (fmat6[i][j].status == "revealed") {
                        document.getElementById('sudokuGrid').rows[i].cells[j].style.borderColor = "black"

                    } else if (fmat6[i][j].status == "hidden") {

                        document.getElementById('sudokuGrid').rows[i].cells[j].style.borderColor = "gray"
                    }
                }
            }
        }
    }

    //pointing the problematic numbers in the row

    for (let i = 0; i < fmat6.length; i++) {
        for (let j1stXindex = 0; j1stXindex < fmat6.length; j1stXindex++) {
            for (let k2ndXindex = 1 + j1stXindex; k2ndXindex < fmat6.length; k2ndXindex++) {
                if (fmat6[i][j1stXindex].value == fmat6[i][k2ndXindex].value) {
                    document.getElementById('sudokuGrid').rows[i].cells[j1stXindex].style.borderColor = "#ff0000"
                    document.getElementById('sudokuGrid').rows[i].cells[k2ndXindex].style.borderColor = "#ff0000"

                }
            }
        }
    }

    //checking and pointing in game problem with columns

    for (j = 0; j < fmat6.length; j++) {

        for (var highestRowcheckcounter = 0, kArrCheckerIndex = 0; kArrCheckerIndex < arrChecker.length; kArrCheckerIndex++) {
            for (var rowcheckcounter = 0, i = 0; i < fmat6.length; i++) {
                if (arrChecker[kArrCheckerIndex] == fmat6[i][j].value) {
                    rowcheckcounter++
                }
            }
            if (rowcheckcounter > highestRowcheckcounter) {
                highestRowcheckcounter = rowcheckcounter
            }

            if (highestRowcheckcounter > 1) {
                for (i = 0; i < fmat6.length; i++) {
                    document.getElementById('sudokuGrid').rows[i].cells[j].style.borderColor = "#990000"
                    fmat6[i][j].legaly = "no"
                }
            } else {
                for (i = 0; i < fmat6.length; i++) {
                    if (fmat6[i][j].status == "revealed" && fmat6[i][j].legalx == "yes") {
                        document.getElementById('sudokuGrid').rows[i].cells[j].style.borderColor = "black"

                    } else if (fmat6[i][j].status == "hidden" && fmat6[i][j].legalx == "yes") {

                        document.getElementById('sudokuGrid').rows[i].cells[j].style.borderColor = "gray"
                    }
                }
            }
        }
    }

    //pointing the problematic numbers in the column

    for (let j = 0; j < fmat6.length; j++) {
        for (let i1stYindex = 0; i1stYindex < fmat6.length; i1stYindex++) {
            for (let k2ndYindex = 1 + i1stYindex; k2ndYindex < fmat6.length; k2ndYindex++) {
                if (fmat6[i1stYindex][j].value == fmat6[k2ndYindex][j].value) {
                    document.getElementById('sudokuGrid').rows[i1stYindex].cells[j].style.borderColor = "#ff0000"
                    document.getElementById('sudokuGrid').rows[k2ndYindex].cells[j].style.borderColor = "#ff0000"

                }
            }
        }
    }

    //checking and pointing in game problem with blocks... BlockXindex... BlockYindex

    for (mBlockYindex = 0; mBlockYindex < Math.sqrt(fmat6.length); mBlockYindex++) {
        for (nBlockXindex = 0; nBlockXindex < Math.sqrt(fmat6.length); nBlockXindex++) {
            for (var highestBlockCheckCounter = 0, kArrCheckerIndex = 0; kArrCheckerIndex < arrChecker.length; kArrCheckerIndex++) {
                for (var blockCheckCounter = 0, iCellYindexInBlcok = 0 + mBlockYindex * Math.sqrt(fmat6.length); iCellYindexInBlcok < Math.sqrt(fmat6.length) + mBlockYindex * Math.sqrt(fmat6.length); iCellYindexInBlcok++) {
                    for (jCellXindexInBlcok = 0 + nBlockXindex * Math.sqrt(fmat6.length); jCellXindexInBlcok < Math.sqrt(fmat6.length) + nBlockXindex * Math.sqrt(fmat6.length); jCellXindexInBlcok++) {
                        if (arrChecker[kArrCheckerIndex] == fmat6[iCellYindexInBlcok][jCellXindexInBlcok].value) {
                            blockCheckCounter++
                        }
                    }
                }
                if (blockCheckCounter > highestBlockCheckCounter) {
                    highestBlockCheckCounter = blockCheckCounter;
                }
                if (highestBlockCheckCounter > 1) {
                    for (iCellYindexInBlcok = 0 + mBlockYindex * Math.sqrt(fmat6.length); iCellYindexInBlcok < Math.sqrt(fmat6.length) + mBlockYindex * Math.sqrt(fmat6.length); iCellYindexInBlcok++) {
                        for (jCellXindexInBlcok = 0 + nBlockXindex * Math.sqrt(fmat6.length); jCellXindexInBlcok < Math.sqrt(fmat6.length) + nBlockXindex * Math.sqrt(fmat6.length); jCellXindexInBlcok++) {
                            document.getElementById('sudokuGrid').rows[iCellYindexInBlcok].cells[jCellXindexInBlcok].style.borderColor = "#990000"
                        }
                    }

                    //pointing the problematic numbers in the blocks

                    for (i1stCellYindex = 0 + Math.sqrt(fmat6.length) * mBlockYindex; i1stCellYindex < Math.sqrt(fmat6.length) + Math.sqrt(fmat6.length) * mBlockYindex; i1stCellYindex++) {
                        for (j1stCellXindex = 0 + Math.sqrt(fmat6.length) * nBlockXindex; j1stCellXindex < Math.sqrt(fmat6.length) + Math.sqrt(fmat6.length) * nBlockXindex; j1stCellXindex++) {
                            for (k2ndCellYindex = 0 + Math.sqrt(fmat6.length) * mBlockYindex; k2ndCellYindex < Math.sqrt(fmat6.length) + Math.sqrt(fmat6.length) * mBlockYindex; k2ndCellYindex++) {
                                for (l2ndCellXindex = 0 + Math.sqrt(fmat6.length) * nBlockXindex; l2ndCellXindex < Math.sqrt(fmat6.length) + Math.sqrt(fmat6.length) * nBlockXindex; l2ndCellXindex++) {
                                    if (fmat6[i1stCellYindex][j1stCellXindex].value == fmat6[k2ndCellYindex][l2ndCellXindex].value) {
                                        if (i1stCellYindex != k2ndCellYindex || j1stCellXindex != l2ndCellXindex) {
                                            document.getElementById('sudokuGrid').rows[i1stCellYindex].cells[j1stCellXindex].style.borderColor = "#ff0000"
                                            document.getElementById('sudokuGrid').rows[k2ndCellYindex].cells[l2ndCellXindex].style.borderColor = "#ff0000"
                                        }
                                    }
                                }
                            }
                        }
                    }

                } else {
                    for (iCellYindexInBlcok = 0 + mBlockYindex * Math.sqrt(fmat6.length); iCellYindexInBlcok < Math.sqrt(fmat6.length) + mBlockYindex * Math.sqrt(fmat6.length); iCellYindexInBlcok++) {
                        for (jCellXindexInBlcok = 0 + nBlockXindex * Math.sqrt(fmat6.length); jCellXindexInBlcok < Math.sqrt(fmat6.length) + nBlockXindex * Math.sqrt(fmat6.length); jCellXindexInBlcok++) {
                            if (fmat6[iCellYindexInBlcok][jCellXindexInBlcok].status == "revealed" && fmat6[iCellYindexInBlcok][jCellXindexInBlcok].legalx == "yes" && fmat6[iCellYindexInBlcok][jCellXindexInBlcok].legaly == "yes") {
                                document.getElementById('sudokuGrid').rows[iCellYindexInBlcok].cells[jCellXindexInBlcok].style.borderColor = "black"

                            } else if (fmat6[iCellYindexInBlcok][jCellXindexInBlcok].status == "hidden" && fmat6[iCellYindexInBlcok][jCellXindexInBlcok].legalx == "yes" && fmat6[iCellYindexInBlcok][jCellXindexInBlcok].legaly == "yes") {

                                document.getElementById('sudokuGrid').rows[iCellYindexInBlcok].cells[jCellXindexInBlcok].style.borderColor = "gray"
                            }
                        }
                    }
                }
            }
        }
    }

    //deleting values that don't fit the sudoku rules while keeping the old value.
    try {



        for (i = 0; i < fmat6.length; i++) {
            for (j = 0; j < fmat6.length; j++) {
                var temp = fmat6[i][j].value
                var modulu = document.getElementById('sudokuGrid').rows[i].cells[j].firstChild.value
                if (fmat6[i][j].value < 1 || fmat6[i][j].value > 9 || modulu % 1 != 0 || modulu == "a") {
                    //document.getElementById('sudokuGrid').rows[i].cells[j].style.borderColor = "#ff0000"
                    document.getElementById('sudokuGrid').rows[i].cells[j].firstChild.value = ''
                    fmat6[i][j].value = temp
                    sudokuSemiChecker(sudokuFiller(fmat2))
                }
            }
        }

    } catch (warn) {
        console.warn("you must have solved the sudoku");

    }

}

//checking the end game sudoku

try {

    function sudokuFullChecker(fmat4) {

        var arrChecker = [1, 2, 3, 4, 5, 6, 7, 8, 9]

        //cheking rows

        for (i = 0; i < fmat4.length; i++) {
            for (kCell1to9 = 0; kCell1to9 < fmat4.length; kCell1to9++) {
                for (j = 0, rowCheckCounter = 0; j < fmat4.length; j++) {
                    if (arrChecker[kCell1to9] == fmat4[i][j].value) {
                        rowCheckCounter++
                        if (rowCheckCounter > 1) {
                            return false
                        }
                    }
                }
                if (rowCheckCounter == 0) {
                    return false
                }
            }
        }

        //checking columns

        for (j = 0; j < fmat4.length; j++) {
            for (kCell1to9 = 0; kCell1to9 < fmat4.length; kCell1to9++) {
                for (i = 0, columncheckcounter = 0; i < fmat4.length; i++) {
                    if (arrChecker[kCell1to9] == fmat4[i][j].value) {
                        columncheckcounter++
                        if (columncheckcounter > 1) {
                            return false
                        }
                    }
                }
                if (columncheckcounter == 0) {
                    return false
                }
            }
        }

        //turning blocks into rows

        fmat5 = []

        for (lYindexJumpper = 0; lYindexJumpper < Math.sqrt(fmat4.length); lYindexJumpper++) {
            for (kXindexJumpper = 0; kXindexJumpper < Math.sqrt(fmat4.length); kXindexJumpper++) {
                fmat5.push([])
                for (i = lYindexJumpper * Math.sqrt(fmat4.length); i < Math.sqrt(fmat4.length) * (lYindexJumpper + 1); i++) {
                    for (j = kXindexJumpper * Math.sqrt(fmat4.length); j < Math.sqrt(fmat4.length) * (1 + kXindexJumpper); j++) {
                        fmat5[(lYindexJumpper * Math.sqrt(fmat4.length)) + kXindexJumpper].push(fmat4[i][j])
                    }
                }
            }

        }

        //checking the rows of the ex blocks

        for (i = 0; i < fmat5.length; i++) {
            for (kCell1to9 = 0; kCell1to9 < fmat5.length; kCell1to9++) {
                for (j = 0, blockCheckCounter = 0; j < fmat5.length; j++) {
                    if (arrChecker[kCell1to9] == fmat5[i][j].value) {
                        blockCheckCounter++
                        if (blockCheckCounter > 1) {
                            return false
                        }
                    }
                }
                if (blockCheckCounter == 0) {
                    return false
                }
            }
        }

        //after winning, deleting all the cells

        for (i = 0; i < fmat5.length; i++) {
            for (j = 0; j < fmat5.length; j++) {
                fmat5[i][j].status = 'revealed'
                document.getElementById("sudokuGrid").rows[i].cells[j].innerHTML = ""
            }
        }

        let totseconds = setTime()
            //console.log(totseconds);

        let seconds = totseconds % 60
        console.log(seconds);


        let minutes = Math.floor(totseconds / 60)
        console.log(minutes);

        if (difficulty < 1) {
            document.getElementById("sudokuGrid").rows[0].cells[0].innerHTML = "G"
            document.getElementById("sudokuGrid").rows[0].cells[1].innerHTML = "O"
            document.getElementById("sudokuGrid").rows[0].cells[2].innerHTML = "O"
            document.getElementById("sudokuGrid").rows[0].cells[3].innerHTML = "D"
            document.getElementById("sudokuGrid").rows[2].cells[0].innerHTML = "G"
            document.getElementById("sudokuGrid").rows[2].cells[1].innerHTML = "A"
            document.getElementById("sudokuGrid").rows[2].cells[2].innerHTML = "M"
            document.getElementById("sudokuGrid").rows[2].cells[3].innerHTML = "E"
        } else {
            document.getElementById("sudokuGrid").rows[1].cells[1].innerHTML = "T"
            document.getElementById("sudokuGrid").rows[1].cells[2].innerHTML = "I"
            document.getElementById("sudokuGrid").rows[1].cells[3].innerHTML = "M"
            document.getElementById("sudokuGrid").rows[1].cells[4].innerHTML = "E"

            if (seconds < 10) {
                document.getElementById("sudokuGrid").rows[2].cells[1].innerHTML = 0
                document.getElementById("sudokuGrid").rows[2].cells[2].innerHTML = minutes
            } else {
                document.getElementById("sudokuGrid").rows[2].cells[1].innerHTML = Math.floor(minutes / 10)
                document.getElementById("sudokuGrid").rows[2].cells[2].innerHTML = minutes % 10
            }

            document.getElementById("sudokuGrid").rows[2].cells[3].innerHTML = ":"

            if (seconds < 10) {
                document.getElementById("sudokuGrid").rows[2].cells[4].innerHTML = 0
                document.getElementById("sudokuGrid").rows[2].cells[5].innerHTML = seconds
            } else {
                document.getElementById("sudokuGrid").rows[2].cells[4].innerHTML = Math.floor(seconds / 10)
                document.getElementById("sudokuGrid").rows[2].cells[5].innerHTML = seconds % 10
            }

            document.getElementById("sudokuGrid").rows[4].cells[2].innerHTML = "W"
            document.getElementById("sudokuGrid").rows[4].cells[3].innerHTML = "E"
            document.getElementById("sudokuGrid").rows[4].cells[4].innerHTML = "L"
            document.getElementById("sudokuGrid").rows[4].cells[5].innerHTML = "L"
            document.getElementById("sudokuGrid").rows[6].cells[1].innerHTML = "P"
            document.getElementById("sudokuGrid").rows[6].cells[2].innerHTML = "L"
            document.getElementById("sudokuGrid").rows[6].cells[3].innerHTML = "A"
            document.getElementById("sudokuGrid").rows[6].cells[4].innerHTML = "Y"
            document.getElementById("sudokuGrid").rows[6].cells[5].innerHTML = "E"
            document.getElementById("sudokuGrid").rows[6].cells[6].innerHTML = "D"
        }

        document.getElementById('sudokuGrid').style.backgroundColor = "gold"
        document.getElementById('prepBox').style.visibility = "visible"

        clearInterval(c)

    }

} catch (error) {
    console.warn(error);
}

function checkDifficulty() {

    var radios = document.getElementsByName('radioDifficulty');

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            localStorage.setItem('selectedDifficulty', radios[i].value);
            window.open("Sudoku.html", "_self")
        }
    }

}

function checkerBackTracking(fmat00, innerDifficultyForBackTrack) {

    if (innerDifficultyForBackTrack < 1) {
        var arrChecker = [1, 2, 3, 4]
    } else {
        var arrChecker = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }

    //cheking rows

    for (i = 0; i < fmat00.length; i++) {
        for (k = 0; k < fmat00.length; k++) {
            for (j = 0, rowCheckCounter = 0; j < fmat00.length; j++) {
                if (arrChecker[k] == fmat00[i][j].value) {
                    rowCheckCounter++
                    if (rowCheckCounter > 1) {
                        return false
                    }
                }
            }
            //if (rowCheckCounter == 0) {
            //    return false
            //}
        }
    }

    //checking columns

    for (j = 0; j < fmat00.length; j++) {
        for (k = 0; k < fmat00.length; k++) {
            for (i = 0, columncheckcounter = 0; i < fmat00.length; i++) {
                if (arrChecker[k] == fmat00[i][j].value) {
                    columncheckcounter++
                    if (columncheckcounter > 1) {
                        return false
                    }
                }
            }
            // if (columncheckcounter == 0) {
            //     return false
            // }
        }
    }

    //turning blocks into rows

    fmat000 = []

    for (l = 0; l < Math.sqrt(fmat00.length); l++) {
        for (k = 0; k < Math.sqrt(fmat00.length); k++) {
            fmat000.push([])
            for (i = l * Math.sqrt(fmat00.length); i < Math.sqrt(fmat00.length) * (l + 1); i++) {
                for (j = k * Math.sqrt(fmat00.length); j < Math.sqrt(fmat00.length) * (1 + k); j++) {
                    fmat000[(l * Math.sqrt(fmat00.length)) + k].push(fmat00[i][j])
                }
            }
        }

    }

    //checking the rows of the ex blocks

    for (i = 0; i < fmat000.length; i++) {
        for (k = 0; k < fmat000.length; k++) {
            for (j = 0, blockCheckCounter = 0; j < fmat000.length; j++) {
                if (arrChecker[k] == fmat000[i][j].value) {
                    blockCheckCounter++
                    if (blockCheckCounter > 1) {
                        return false
                    }
                }
            }
            // if (blockCheckCounter == 0) {
            //     return false
            // }
        }
    }

    return true

}

//clock

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
c = setInterval(setTime, 1000);

function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    return totalSeconds
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

setTime()