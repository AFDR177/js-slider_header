class Slider {
  //посилання на slider__content
  static #content = null

  // кнопки slider__button--left та slider__button--right
  static #left = null
  static #right = null

  //поточна картика яка показується в слайдері
  static #count = 1

  //максимальна кількість картинок в списку
  static #max = null

  //стат публічний метод, в якому підкючаємо всі значення до наших полей
  static init = () => {
    this.#content = document.querySelector(
      '.slider__content',
    )
    this.#left = document.querySelector(
      '.slider__button--left',
    )
    this.#right = document.querySelector(
      '.slider__button--right',
    )

    //дає інформацію скільки дитячих елементів в блоці з селектором .slider__content
    this.#max = this.#content.childElementCount

    this.#left.onclick = () => this.#slide('left')
    this.#right.onclick = () => this.#slide('right')
  }

  //метод який прокручує картинки (по суті карусель)
  static #slide = (side) => {
    //дізнаємося поточну інформацію
    const offsetWidth = this.#content.offsetWidth // ширина однієї прокрутки
    const scrollLeft = this.#content.scrollLeft
    const scrollWidth = this.#content.scrollWidth // ширина всієї прокрутки

    // зміна яка буде казати на скільки рх прокрутити
    let scroll = 0

    if (side === 'left') {
      if (this.#count === 1 || scrollLeft === 0) {
        this.#count = this.#max
        scroll = (this.#count - 1) * offsetWidth
      } else {
        this.#count -= 1
        scroll = (this.#count - 1) * offsetWidth
        // scroll = -offsetWidth // мій варінт на начальному етапі
      }
    }

    if (side === 'right') {
      if (
        this.#count === this.#max ||
        scrollLeft === scrollWidth - offsetWidth
      ) {
        this.#count = 1
        scroll = 0
      } else {
        this.#count += 1
        scroll = (this.#count - 1) * offsetWidth

        //   scroll = offsetWidth // мій варінт на начальному етапі
      }
    }
    //виконуємо прокрутку
    this.#content.scrollTo({
      top: 0,
      left: scroll,
      behavior: 'smooth',
    })
  }
}

Slider.init()

class Header {
  static #height = null // інфо про висоту нашого меню
  static #wrapper = null // це наш header__wrapper
  static #button = null //це кнопка

  static #isOpen = false

  static init = () => {
    this.#height = document.querySelector(
      '.header__bottom',
    ).offsetHeight
    this.#wrapper = document.querySelector(
      '.header__wrapper',
    )
    this.#button = document.querySelector('.header__button')

    this.#button.onclick = this.#toggle
  }

  static #toggle = () => {
    if (this.#isOpen) {
      //замінюємо класи
      this.#button.classList.replace(
        'header__button--close',
        'header__button--open',
      )

      this.#wrapper.style.height = 0
    } else {
      //замінюємо класи
      this.#button.classList.replace(
        'header__button--open',
        'header__button--close',
      )
      this.#wrapper.style.height = `${this.#height}px`
    }

    this.#isOpen = !this.#isOpen
  }
}

Header.init()
