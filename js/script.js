$(function(){

// var attack = ['ビンタ', 'グーパンチ', 'ローキック', 'ヘッドロック'];
// var damage = [20, 30, 50, 20];

var attack = [
  {attackName:'ビンタ', damage: 10},
  {attackName:'グーパンチ', damage: 20},
  {attackName:'ローキック', damage: 50},
  {attackName:'ヘッドロック', damage: 30},
]
// console.log(attack[3].damage);
// var test = function() {
//   return 1000000;
// }
// console.log(test());

if(window.confirm('モンスターが現れた！戦いますか？')) {
  $('.panel').fadeIn(2000);

  $('#fight').on('click', function(){
    for(var i = 0; i < attack.length; i++) {
      var target = $('.panel ul li').eq(i).find('span');
      target.text(attack[i].attackName);
      for(var s = 1; s < attack.length; s++) {
        $('.panel ul li').eq(s).addClass('attacked');
      }
      $('.panel ul li').eq(0).addClass('first');
    }

    // document.getElementById('this').textContent = attack[0];
});

var enemy = 100;  /*敵の体力*/
$('#enemyDamaged').text(enemy);
var ally = 100; /*味方の体力*/
$('#allyDamaged').text(ally);

// ---体力が0になった時のファンクション----
//敵
var enemyDied = function() {
  $('.enemy img').fadeOut(1000);
  $('.enemyDied').slideDown(2500);
}
//味方
const allyDied = function() {
  $('.ally img').fadeOut(1000);
  $('.allyDied').slideDown(2500);
}

// --- 技クリックイベント ---
$('.panel ul li').on('click', function(){
  if($(this).hasClass('attacked')) {
    // --- ダメージパネルの表記 ---
    // -- 味方 --
    $('#allyName').text('ジェイソン');
    $('#attackedName').text($(this).find('span').text());
    // -- 敵 --
    $('#enemyName').text('エイジャックス');

    // --- 敵が受けるダメージ ---
    var attackedNameIndex = $('.panel ul li').index($(this));
    const allyAttack = attack[attackedNameIndex].damage;
    $('#allyAttack').text(allyAttack);
    enemy -= allyAttack; //敵の残体力から味方の攻撃力をマイナスする
    // console.log(attackedNameIndex);
      // ---体力0に合わせる条件分岐---
      // -------(memo)clickイベント内で変更したenemy(グローバル変数をローカルスコープ内で変更)をグローバルスコープにしたかった。returnは使えない？---
    // if(enemy <= 50 && attackedNameIndex === 2) {
    //   enemy = 0;
    //   enemyDied();
    // } else if(enemy <= 30 && attackedNameIndex === 2 && attackedNameIndex === 1){
    //   enemy = 0;
    //   enemyDied();
    // } else if(enemy <= 20) {
    //   enemy = 0;
    //   enemyDied();
    // } else {
    //   enemy -= allyAttack;
    // }
    // $('#enemyDamaged').text(enemy);

    // --- 味方が受けるダメージ ---
    var enemyAttack = Math.floor(Math.random()*50 + 1);
    ally -= enemyAttack;
    console.log('味方の体力' + ally);
    $('#enemyAttack').text(enemyAttack);

    // --- ダメージパネルを表示する(パターン1：fadeIn_第2引数function) ---
    // $('.allyDamage').fadeIn(500, function(){
    //   $('#enemyDamaged').text(enemy);
    //   $('#enemyDamaged').toggleClass('red');
    //   $(this).fadeOut(1000, function(){
    //     $('#enemyDamaged').toggleClass('red');
    //     $('#allyDamaged').toggleClass('red');
    //     $('#allyDamaged').text(ally);
    //     $('.enemyDamage').fadeIn(1000, function(){
    //       $('#allyDamaged').toggleClass('red');
    //       $(this).fadeOut(1000);
    //     });
    //   });
    // });

    // --- ダメージパネルを表示する(パターン2：setTimeoutメソッド) ---
    const aFadein = function() { //敵が攻撃を受けた時
      $('.allyDamage').fadeIn();
      $('#enemyDamaged').toggleClass('red');
      if(enemy > 0) {
        $('#enemyDamaged').text(enemy);
        refresh();
      } else {
        $('#enemyDamaged').text(0);
        enemyDied();
        winner();
      }
    }

    const eFadein = function() { //味方が攻撃を受けた時
      $('#enemyDamaged').toggleClass('red'); //enemyのredクラスを削除する
      $('.enemyDamage').fadeIn();
      $('#allyDamaged').toggleClass('red');

      if(ally > 0) {
        $('#allyDamaged').text(ally);
        refreshEnd();
      } else {
        $('#allyDamaged').text(0);
        allyDied();
        winner();
      }
    }
    const endDuel = function() {
      $('#allyDamaged').toggleClass('red'); //allyのredクラスを削除する
      $('.allyDamage').fadeOut();
      $('.enemyDamage').fadeOut();
    }
    const winnerSpread = function() { //勝敗がついた時の動作
      if(enemy <= 0) {
        $('.aImage').addClass('aSpread');//味方を大きくして中央へ移動
      } else if(ally <= 0) {
        $('.eImage').addClass('iSpread');//敵を大きくして中央へ移動
      }
      displayDelete();

    }

    const refresh = function() {
      setTimeout(eFadein, 2000);
    }
    const refreshEnd = function() {
    setTimeout(endDuel, 2000);
    }
    const winner = function() {
      setTimeout(winnerSpread, 2600);
    }

    const displayDelete = function() {
      $('#winText').slideDown(2300);
      $('.e-metar, .damage-wrapper').fadeOut();
      if(enemy <= 0) {
        $('.enemy-wrapper, .a-metar, .panel').fadeOut();
      } else if(ally <= 0) {
        $('.ally').fadeOut();
      }
    }
    aFadein();



  } else if($(this).hasClass('first')) {
    $(this).removeClass('first');
    $(this).addClass('attacked');
    console.log('firstクラスを削除しました。');
  }
});
// ---体力0以下 fadeOut------
// var damagedEnemy = $('#enemyDamaged').text();
// console.log(damagedEnemy);
// if(damagedEnemy <= 0) {
//   $('.enemy img').fadeOut();
//   $('.died').fadeIn('slow');
// }






} else { /* window.confirm*/
    console.log('逃げちゃダメだ。逃げちゃダメだ。逃げちゃダメだ。逃げちゃダメだ。逃げちゃダメだ。逃げちゃダメだ。逃げちゃダメだ。逃げちゃダメだ。逃げちゃダメだ。逃げちゃダメだ。逃げちゃダメだ。逃げちゃダメだ。逃げちゃダメだ。逃げちゃダメだ。逃げちゃダメだ。逃げちゃダメだ。');
  }




















});
