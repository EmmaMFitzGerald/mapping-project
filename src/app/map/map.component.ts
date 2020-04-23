import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
// eslint-disable-next-line import/extensions
import { MapService } from "../map.service";

@Component({
    selector: "app-map",
    templateUrl: "./map.component.html",
    styleUrls: ["./map.component.css"],
})
// eslint-disable-next-line import/prefer-default-export
export class MapComponent implements OnInit {
    @ViewChild("map", { static: true }) mapElement: ElementRef;

    totalDeaths = 0;

    totalCases = 0;

    date;

    // eslint-disable-next-line no-useless-constructor
    constructor(private mapService: MapService) {}

    filterDate() {
        // eslint-disable-next-line no-undef
        // eslint-disable-next-line no-restricted-globals
        const element = (event.currentTarget as unknown) as HTMLInputElement;
        const date = element.value;
        this.mapService.setDateToFilter(date);
        const formattedDate = new Date(
            parseInt(date, 10) * 1000 * 60 * 60 * 24
        );
        this.date = formattedDate.toDateString();
    }

    ngOnInit(): void {
        this.mapService.coronaData$.subscribe((val: any) => {
            if (val !== undefined) {
                this.mapService.initialize(this.mapElement);
                console.log(this.mapElement);
            }
        });

        this.mapService.selectedDateData$.subscribe((val: any) => {
            // val should have totalDeaths property
            console.log("val:", val);
            this.totalDeaths = val.totalDeaths.toLocaleString();
            this.totalCases = val.totalCases.toLocaleString();
        });
        const formattedDate = new Date(18283 * 1000 * 60 * 60 * 24);
        this.date = formattedDate.toDateString();
    }
}
