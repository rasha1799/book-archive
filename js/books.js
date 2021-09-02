

const loadBooks = () => {
    const searchField = document.getElementById('search-input')
    const searchText = searchField.value;

    searchField.value = '';
    if (searchText === '') {
        return 'Please write something.'
    }
    fetch(`https://openlibrary.org/search.json?q=${searchText}`).then(res => res.json())
        .then(data => displaySearchResult(data.docs));

}
//toggle
const toggleError = displayStyle => {
    document.getElementById('error').style.display = displayStyle;
}
const toggleSearchResult = displayStyle => {
    document.getElementById('total-run').style.display = displayStyle;
}

const displaySearchResult = books => {
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';



    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
          <img src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid" alt="..." >
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">Publish Year:${book
                .first_publish_year ? book
                .first_publish_year : 'Not Available'}</p>
            <p class="card-text">Publisher:${book.publisher}</p>
        </div>
      </div>
        `
        searchResult.appendChild(div);

    });
    if (books.length === 0) {
        const error = document.getElementById('error')
        error.innerText = 'no result found'
        toggleError('block');
        toggleSearchResult('none');

    }
    else {
        const totalRun = document.getElementById('total-run');
        totalRun.innerHTML = `<h3>Total results are ${books.length}</h3>`;
        toggleSearchResult('block');
        toggleError('none');

    }


}