package com.application.product.entiry;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false, unique = true)
    private String name;
    private String description;
    private String imageUrl;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private Integer quantity;

    private UUID categoryId;

    private Integer numComment = 0;
    private Integer numStar = 0;

    private Double rating = 0.0;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "product_id")
    @OrderColumn(name = "image_order")
    private List<ProductImage> images = new ArrayList<>();

    @PrePersist
    @PreUpdate
    public void roundRatingBeforeSave() {
        if (this.rating != null) {
            this.rating = Math.round(this.rating * 10.0) / 10.0;
        } else {
            this.rating = 0.0;
        }
    }
}
