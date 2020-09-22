/ *！
 * jQuery.BgSwitcher
 *
 * @バージョン0.4.3
 * @author rewish <rewish.org@gmail.com>
 * @license MITライセンス（https://github.com/rewish/jquery-bgswitcher/blob/master/LICENSE.md）
 * @リンクhttps://github.com/rewish/jquery-bgswitcher
 * /
（関数（$）{
  '厳格な使用';

  var loadedImages = {}、

      slice = Array.prototype.slice、
      toString = Object.prototype.toString、

      corners = ['上'、 '右'、 '下'、 '左']、
      backgroundProperties = [
        「添付ファイル」、「色」、「画像」、「繰り返し」、
        「位置」、「サイズ」、「クリップ」、「原点」
      ];

  $ .fn.bgswitcher = function（）{
    var args =引数、
        instanceKey = BgSwitcher.keys.instance;

    this.each（function（）{
      var instance = $ .data（this、instanceKey）;

      if（！instance）{
        インスタンス=新しいBgSwitcher（this）;
        $ .data（this、instanceKey、instance）;
      }

      instance.dispatch.apply（instance、args）;
    }）;
  };

  //下位互換性
  $ .fn.bgSwitcher = $ .fn.bgswitcher;

  / **
   * BgSwitcher
   *
   * @param {HTMLElement} el
   * @コンストラクタ
   * /
  function BgSwitcher（el）{
    this。$ el = $（el）;
    this.index = 0;
    this.config = $ .extend（{}、BgSwitcher.defaultConfig）;

    this._setupBackgroundElement（）;
    this._listenToResize（）;
  }

  $ .extend（BgSwitcher.prototype、{
    / **
     *発送
     *
     * @param {string | Array} 1つ
     * /
    ディスパッチ：function（one）{
      スイッチ（toString.call（one））{
        ケース '[オブジェクトオブジェクト]'：
          this.setConfig（one）;
          ブレーク;
        ケース '[オブジェクト文字列]'：
          this [one] .apply（this、slice.call（arguments、1））;
          ブレーク;
        デフォルト：
          新しいエラーをスローします（ 'オブジェクトまたは文字列を指定してください'）;
      }
    }、

    / **
     *設定を設定
     *
     * @param {Object} config
     * /
    setConfig：function（config）{
      this.config = $ .extend（this.config、config）;

      if（typeof this.config.random！== 'undefined'）{
        this.config.shuffle = this.config.random;
      }

      this.refresh（）;
    }、

    / **
     *セット画像
     *
     * @param {Array}画像
     * /
    setImages：function（images）{
      this.imageList = new this.constructor.ImageList（images）;

      if（this.config.shuffle）{
        this.imageList.shuffle（）;
      }
    }、

    / **
     *スイッチハンドラーの設定
     *
     * @param {関数} fn
     * /
    setSwitchHandler：function（fn）{
      this.switchHandler = $ .proxy（fn、this）;
    }、

    / **
     *デフォルトのスイッチハンドラ
     *
     * @param {string}タイプ
     * @returns {関数}
     * /
    getBuiltInSwitchHandler：function（type）{
      this.constructor.switchHandlers [type ||を返す this.config.effect];
    }、

    / **
     *更新
     * /
    リフレッシュ：function（）{
      this.setImages（this.config.images）;
      this.setSwitchHandler（this.getBuiltInSwitchHandler（））;
      this._prepareSwitching（）;

      if（this.config.start）{
        this.start（）;
      }
    }、

    / **
     *切り替えを開始
     * /
    開始：function（）{
      if（！this._timerID）{
        this._timerID = setTimeout（$。proxy（this、 'next'）、this.config.interval）;
      }
    }、

    / **
     *切り替えを停止
     * /
    停止：function（）{
      if（this._timerID）{
        clearTimeout（this._timerID）;
        this._timerID = null;
      }
    }、

    / **
     *開始/停止を切り替え
     * /
    トグル：function（）{
      if（this._timerID）{
        this.stop（）;
      } そうしないと {
        this.start（）;
      }
    }、

    / **
     *リセット切り替え
     * /
    リセット：function（）{
      this.index = 0;
      this._prepareSwitching（）;
    }、

    / **
     *次の切り替えに進む
     * /
    次：function（）{
      var max = this.imageList.count（）;

      if（！this.config.loop && this.index + 1 === max）{
        戻る;
      }

      if（++ this.index === max）{
        this.index = 0;
      }

      this.switching（）;
    }、

    / **
     *前の切り替えに移動
     * /
    前：function（）{
      if（！this.config.loop && this.index === 0）{
        戻る;
      }

      if（--this.index === -1）{
        this.index = this.imageList.count（）-1;
      }

      this.switching（）;
    }、

    / **
     *インデックスで切り替えを選択
     *
     * @param {number}インデックス
     * /
    選択：function（index）{
      if（index === -1）{
        index = this.imageList.count（）-1;
      }

      this.index = index;
      this.switching（）;
    }、

    / **
     *背景画像の切り替え
     * /
    切り替え：function（）{
      var started = !! this._timerID;

      （開始した場合）{
        this.stop（）;
      }

      this._createSwitchableElement（）;
      this._prepareSwitching（）;
      this.switchHandler（this。$ switchable）;

      （開始した場合）{
        this.start（）;
      }
    }、

    / **
     * 破壊...
     * /
    destroy：function（）{
      this.stop（）;
      this._stopListeningToResize（）;

      if（this。$ switchable）{
        this。$ switchable.stop（）;
        this。$ switchable.remove（）;
        this。$ switchable = null;
      }

      if（this。$ bg）{
        this。$ bg.remove（）;
        this。$ bg = null;
      }

      this。$ el.removeAttr（ 'style'）;
      this。$ el.removeData（this.constructor.keys.instance）;
      this。$ el = null;
    }、

    / **
     *長方形を調整
     * /
    _adjustRectangle：function（）{
      varコーナー、
          i = 0、
          長さ= corners.length、
          オフセット= this。$ el.position（）、
          コピーされたスタイル= {
            top：offset.top、
            左：offset.left、
            幅：this。$ el.innerWidth（）、
            高さ：this。$ el.innerHeight（）
          };

      for（; i <長さ; i ++）{
        corner = corners [i];
        CopyedStyles ['margin' + corner] = this。$ el.css（ 'margin' + corner）;
        CopyedStyles ['border' + corner] = this。$ el.css（ 'border' + corner）;
      }

      this。$ bg.css（copiedStyles）;
    }、

    / **
     *背景要素の設定
     * /
    _setupBackgroundElement：function（）{
      this。$ bg = $（document.createElement（ 'div'））;
      this。$ bg.css（{
        位置： '絶対'、
        zIndex：（parseInt（this。$ el.css（ 'zIndex'）、10）|| 0）-1、
        オーバーフロー： '非表示'
      }）;

      this._copyBackgroundStyles（）;
      this._adjustRectangle（）;

      if（this。$ el [0] .tagName === 'BODY'）{
        this。$ el.prepend（this。$ bg）;
      } そうしないと {
        this。$ el.before（this。$ bg）;
        this。$ el.css（ 'background'、 'none'）;
      }
    }、

    / **
     *切り替え可能な要素を作成する
     * /
    _createSwitchableElement：function（）{
      if（this。$ switchable）{
        this。$ switchable.remove（）;
      }

      this。$ switchable = this。$ bg.clone（）;
      this。$ switchable.css（{top：0、left：0、margin：0、border： 'none'}）;
      this。$ switchable.appendTo（this。$ bg）;
    }、

    / **
     *背景スタイルをコピーする
     * /
    _copyBackgroundStyles：function（）{
      var prop、
          copyStyle = {}、
          i = 0、
          length = backgroundProperties.length、
          backgroundPosition = 'backgroundPosition';

      for（; i <長さ; i ++）{
        prop = 'background' + backgroundProperties [i];
        copyStyle [prop] = this。$ el.css（prop）;
      }

      // IE <= 9の場合
      if（copiedStyle [backgroundPosition] === undefined）{
        copyStyle [backgroundPosition] = [
          this。$ el.css（backgroundPosition + 'X'）、
          this。$ el.css（backgroundPosition + 'Y'）
        ] .join（ ''）;
      }

      this。$ bg.css（copiedStyle）;
    }、

    / **
     *サイズ変更イベントを聞く
     * /
    _listenToResize：function（）{
      var that = this;
      this._resizeHandler = function（）{
        that._adjustRectangle（）;
      };
      $（window）.on（ 'resize'、this._resizeHandler）;
    }、

    / **
     *サイズ変更イベントのリスニングを停止する
     * /
    _stopListeningToResize：function（）{
      $（window）.off（ 'resize'、this._resizeHandler）;
      this._resizeHandler = null;
    }、

    / **
     *スイッチングの準備
     * /
    _prepareSwitching：function（）{
      this。$ bg.css（ 'backgroundImage'、this.imageList.url（this.index））;
    }
  }）;

  / **
   *データキー
   * @type {Object}
   * /
  BgSwitcher.keys = {
    インスタンス： 'bgSwitcher'
  };

  / **
   *デフォルト設定
   * @type {Object}
   * /
  BgSwitcher.defaultConfig = {
    画像：[]、
    間隔：5000、
    開始：true、
    ループ：true、
    シャッフル：false、
    効果： 'フェード'、
    期間：1000、
    イージング：「スイング」
  };

  / **
   *組み込みスイッチハンドラー（エフェクト）
   * @type {Object}
   * /
  BgSwitcher.switchHandlers = {
    フェード：function（$ el）{
      $ el.animate（{opacity：0}、this.config.duration、this.config.easing）;
    }、

    ブラインド：function（$ el）{
      $ el.animate（{height：0}、this.config.duration、this.config.easing）;
    }、

    クリップ：function（$ el）{
      $ el.animate（{
        top：parseInt（$ el.css（ 'top'）、10）+ $ el.height（）/ 2、
        高さ：0
      }、this.config.duration、this.config.easing）;
    }、

    スライド：function（$ el）{
      $ el.animate（{top：-$ el.height（）}、this.config.duration、this.config.easing）;
    }、

    ドロップ：function（$ el）{
      $ el.animate（{
        左：-$ el.width（）、
        不透明度：0
      }、this.config.duration、this.config.easing）;
    }、

    非表示：関数（$ el）{
      $ el.hide（）;
    }
  };

  / **
   *効果を定義する
   *
   * @param {String}名
   * @param {関数} fn
   * /
  BgSwitcher.defineEffect = function（name、fn）{
    this.switchHandlers [name] = fn;
  };

  / **
   * BgSwitcher.ImageList
   *
   * @param {Array}画像
   * @コンストラクタ
   * /
  BgSwitcher.ImageList = function（images）{
    this.images = images;
    this.createImagesBySequence（）;
    this.preload（）;
  };

  $ .extend（BgSwitcher.ImageList.prototype、{
    / **
     *画像はシーケンス可能です
     *
     * @returns {boolean}
     * /
    isSequenceable：function（）{
      typeof this.images [0]を返す=== 'string' &&
          typeof this.images [1] === 'number' &&
          typeof this.images [2] === 'number';
    }、

    / **
     *シーケンスで画像を作成する
     * /
    createImagesBySequence：function（）{
      if（！this.isSequenceable（））{
        戻る;
      }

      var images = []、
          base = this.images [0]、
          min = this.images [1]、
          max = this.images [2];

      行う {
        images.push（base.replace（/ \。\ w + $ /、min + '$＆'））;
      } while（++ min <= max）;

      this.images = images;
    }、

    / **
     *画像をプリロードする
     * /
    プリロード：function（）{
      var path、
          長さ= this.images.length、
          i = 0;

      for（; i <長さ; i ++）{
        パス= this.images [i];
        if（！loadedImages [path]）{
          loadedImages [path] = new Image（）;
          loadedImages [path] .src = path;
        }
      }
    }、

    / **
     *画像をシャッフルする
     * /
    シャッフル：function（）{
      var j、t、
          i = this.images.length、
          original = this.images.join（）;

      もし私が） {
        戻る;
      }

      （i）{
        j = Math.floor（Math.random（）* i）;
        t = this.images [-i];
        this.images [i] = this.images [j];
        this.images [j] = t;
      }

      if（this.images.join（）=== original）{
        this.shuffle（）;
      }
    }、

    / **
     *インデックスから画像を取得
     *
     * @param {number}インデックス
     * @returns {string}
     * /
    get：function（index）{
      this.images [index]を返します。
    }、

    / **
     * CSSの機能でURLを取得
     *
     * @param {number}インデックス
     * @returns {string}
     * /
    url：function（index）{
      return 'url（' + this.get（index）+ '）';
    }、

    / **
     *画像の数
     *
     * @returns {数値}
     * /
    カウント：function（）{
      this.images.lengthを返す;
    }
  }）;

  $ .BgSwitcher = BgSwitcher;
}（jQuery））;