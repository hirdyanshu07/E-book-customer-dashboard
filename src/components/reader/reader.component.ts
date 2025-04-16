import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reader',
  imports:[ RouterModule, CommonModule ],
  standalone: true,
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css'],
})
export class ReaderComponent implements OnInit {
  bookId: string = '';
  currentBook: any;
  currentPage: number = 0;
  linesPerPage: number = 10;
  content: string[] = [];
  readLines: Set<number> = new Set();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id') || '';
    this.loadBook();
    this.loadProgress();
  }

  loadBook() {
    this.currentBook = {
      id: this.bookId,
      title: `Book #${this.bookId}`,
      content: Array.from({ length: 100 }, (_, i) => `This is line ${i + 1} of your e-book.`)
    };
    this.content = this.currentBook.content;
  }

  get totalPages(): number {
    return Math.ceil(this.content.length / this.linesPerPage);
  }

  get visibleLines(): string[] {
    const start = this.currentPage * this.linesPerPage;
    return this.content.slice(start, start + this.linesPerPage);
  }
  
  get storageKey(): string {
    return `reader-progress-${this.bookId}`;
  }

  loadProgress() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      const data = JSON.parse(saved);
      this.currentPage = data.page || 0;
      this.readLines = new Set(data.lines || []);
    }
  }

  saveProgress() {
    const data = {
      page: this.currentPage,
      lines: Array.from(this.readLines)
    };
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  isLineRead(index: number): boolean {
    const absoluteIndex = this.currentPage * this.linesPerPage + index;
    return this.readLines.has(absoluteIndex);
  }

  markLineAsRead(index: number) {
    const absoluteIndex = this.currentPage * this.linesPerPage + index;
    this.readLines.add(absoluteIndex);
    this.saveProgress();
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.saveProgress();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.saveProgress();
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
