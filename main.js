const bookshelf = [];
const RENDER_EVENT = 'render-bookshelf'
const bookStorage = 'BOOK_STORAGE'

document.addEventListener('DOMContentLoaded', function () {
    const submitInputBook = document.getElementById('inputBook');
    submitInputBook.addEventListener('submit', function (event) {
      event.preventDefault();
      addBookshelf();
    });
  });


    function addBookshelf() {
        const title = document.getElementById('inputBookTitle').value;
        const author = document.getElementById('inputBookAuthor').value;
        const year = parseInt(document.getElementById('inputBookYear').value);
        const generatedID = generateId();
        const completedCheckbox = document.getElementById('inputBookIsComplete');
        let isCompleted = completedCheckbox.checked;
        const bookshelfObject = generatebookshelfObject(generatedID, title, author, year, isCompleted);
  bookshelf.push(bookshelfObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
}
function generateId() {
    return +new Date();
  }

  function generatebookshelfObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted
    };
  }
  document.addEventListener(RENDER_EVENT, function() {
    const incompetedBOOKList = document.getElementById('incompleteBookshelfList');
    incompetedBOOKList.innerHTML = '';
    const completedBOOKList = document.getElementById('completeBookshelfList');
    completedBOOKList.innerHTML = '';
    for(const bookItem of bookshelf){
        const bookElement = makeBook(bookItem);
        if(!bookItem.isCompleted){
            incompetedBOOKList.append(bookElement);
        }
        else{
            completedBOOKList.append(bookElement);
        }
    }
})

function makeBook(bookshelfObject){
  const title = document.createElement('h2');
  title.innerText = bookshelfObject.title;

  const author = document.createElement('p');
  author.innerText = bookshelfObject.author;

  const year = document.createElement('p');
  year.innerText = bookshelfObject.year;

  const container = document.createElement('div');
  container.classList.add('item');

  const bookContainer = document.createElement('article');
  bookContainer.append(title, author, year, container);
  bookContainer.setAttribute('id', `todo-${bookshelfObject.id}`);

  if (bookshelfObject.isCompleted) {
    const unfinishedButton = document.createElement('button');
    unfinishedButton.classList.add('blue');
    unfinishedButton.innerText = 'Belum selesai dibaca';

    unfinishedButton.addEventListener('click', function() {
      completeToUnfinishedBook(bookshelfObject.id);
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('red');
    deleteButton.innerText = 'Hapus';

    deleteButton.addEventListener('click', function () {
      removeBook(bookshelfObject.id);
    });

    container.append(unfinishedButton, deleteButton);
  } else {
    const finishedButton = document.createElement('button');
    finishedButton.classList.add('green');
    finishedButton.innerText = 'Sudah selesai dibaca';

    finishedButton.addEventListener('click', function () {
      completeToFinishedBook(bookshelfObject.id);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('red');
    deleteButton.innerText = 'Hapus';
    });

    container.append(finishedButton, deleteButton);
  }
  return bookContainer;

}

function unfinishedToCompleteTheBook (bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function completeToUnfinishedBook (bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBook(bookId) {
  for (const bookItem of bookshelf) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}
function removeBook (bookId){
  const bookTarget = findBookIndex(bookId);
  if (bookTarget === -1) return;
  bookshelf.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
}
function findBookIndex (bookId){
  for(const index in bookshelf){
      if(bookshelf[index].id === bookId){
          return index;
      }
  }
  return -1;
}