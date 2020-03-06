// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
    fetch: function () {
        var todos = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        )
        todos.forEach(function (todo, index) {
            todo.id = index
        })
        todoStorage.uid = todos.length
        return todos
    },
    save: function (todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
}

const app = new Vue({
    el: '#app',

    data: {
        todos: [],

        current: -1,

        options: [
            { value: -1, label: 'すべて' },
            { value: 0, label: '作業中' },
            { value: 1, label: '完了' }
        ]
    },

    methods: {
        doAdd: function (event, value) {
            var comment = this.$refs.comment
            if (!comment.value.length) {
                return
            }

            this.todos.push({
                id: todoStorage.uid++,
                comment: comment.value,
                state: 0
            })

            comment.value = ''
        },

        doChangeState: function (item) {
            item.state = item.stete ? 0 : 1
        },

        doRemove: function (item) {
            var index = this.todos.indexOf(item)
            this.todos.splice(index, 1)
        }
    },

    watch: {
        todos: {
            handler: function (todos) {
                todoStorage.save(todos)
            },

            deep: true
        }
    },

    computed: {
        labels() {
            return this.options.reduce(function (a, b) {
                return Object.assign(a, { [b.value]: b.label })
            }, {})
        },

        computedTodos: function () {
            return this.todos.filter(function (el) {
                return this.current < 0 ? true : this.current === el.state
            }, this)
        }
    },

    created() {
        this.todos = todoStorage.fetch()
    }
})

new Vue({
    el: '#app1',
    data: {
        show: true
    }
})

var app2 = new Vue({
    el: '#app2',
    data: {
        todos: [],
        options: [
            { value: -1, label: 'すべて' },
            { value: 0, label: '作業中' },
            { value: 1, label: '完了' }
        ],
        // 選択している options の value を記憶するためのデータ
        // 初期値を「-1」つまり「すべて」にする
        current: -1
    },
    methods: {
        // ToDo 追加の処理
        doAdd: function (event, value) {
            // ref で名前を付けておいた要素を参照
            var comment = this.$refs.comment
            // 入力がなければ何もしないで return
            if (!comment.value.length) {
                return
            }
            // { 新しいID, コメント, 作業状態 }
            // というオブジェクトを現在の todos リストへ push
            // 作業状態「state」はデフォルト「作業中=0」で作成
            this.todos.push({
                id: todoStorage.uid++,
                comment: comment.value,
                state: 0
            })
            // フォーム要素を空にする
            comment.value = ''
        },
        doChangeState: function (item) {
            item.state = item.state ? 0 : 1
        },
        // 削除の処理
        doRemove: function (item) {
            var index = this.todos.indexOf(item)
            this.todos.splice(index, 1)
        }
    },
    watch: {
        // オプションを使う場合はオブジェクト形式にする
        todos: {
            // 引数はウォッチしているプロパティの変更後の値
            handler: function (todos) {
                todoStorage.save(todos)
            },
            // deep オプションでネストしているデータも監視できる
            deep: true
        }
    },
    created() {
        // インスタンス作成時に自動的に fetch() する
        this.todos = todoStorage.fetch()
    },
    computed: {
        computedTodos: function () {
            // データ current が -1 ならすべて
            // それ以外なら current と state が一致するものだけに絞り込む
            return this.todos.filter(function (el) {
                return this.current < 0 ? true : this.current === el.state
            }, this)
        },
        labels() {
            return this.options.reduce(function (a, b) {
                return Object.assign(a, { [b.value]: b.label })
            }, {})
            // キーから見つけやすいように、次のように加工したデータを作成
            // {0: '作業中', 1: '完了', -1: 'すべて'}
        }
    }
})


function hamburger() {
    document.getElementById('line1').classList.toggle('linea');
    document.getElementById('line2').classList.toggle('lineb');
    document.getElementById('line3').classList.toggle('linec');
    document.getElementById('target').classList.toggle('slidex');
    document.getElementById('nav_f').classList.toggle('fadein');
}

document.getElementById('target').addEventListener('click', function () {
    hamburger();
});

let list = document.getElementsByClassName('list');

for (let i = 0; i < list.length; i++) {
    list[i].addEventListener('click', function () {
        hamburger();
    });
}

var app3 = new Vue({
    el: '#app3',
    data: {
        // フォームの入力と紐付けるデータ
        budget: 300,
        // 表示件数
        limit: 2,
        // もとになるリスト
        list: [
            { id: 1, name: 'りんご', price: 100 },
            { id: 2, name: 'ばなな', price: 200 },
            { id: 3, name: 'いちご', price: 400 },
            { id: 4, name: 'おれんじ', price: 300 },
            { id: 5, name: 'めろん', price: 500 }
        ]
    },
    computed: {
        // budget以下のリストを返す算出プロパティ
        matched: function () {
            return this.list.filter(function (el) {
                return el.price <= this.budget
            }, this)
        },
        // matchedで返ったデータをlimit件返す算出プロパティ
        limited: function () {
            return this.matched.slice(0, this.limit)
        }
    }
})

new Vue({
    el: '#app4',
    data: {
      val: true
    }
  })