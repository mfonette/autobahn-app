import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnDefinition } from '../../column-definition';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: ColumnDefinition[] = [];
  displayedColumns: string[] = [];
  @Output() viewAction = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<any>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource.data = this.data;
    }
    if (changes['columns']) {
      this.displayedColumns = this.columns.map((col) => col.dataKey);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  viewDetails(element: any) {
    this.viewAction.emit(element);
  }
}
